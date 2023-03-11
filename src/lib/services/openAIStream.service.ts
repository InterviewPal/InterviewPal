import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
} from "eventsource-parser";

// see https://platform.openai.com/docs/guides/chat/introduction to understand the chatGPT agent
export type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
    role: ChatGPTAgent;
    content: string;
}

export interface OpenAIStreamPayload {
    model: string;
    messages: ChatGPTMessage[];
    temperature: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
    max_tokens: number;
    stream: boolean;
    n: number;
}

export const OpenAIStreamService = {
    async getFetchedResponse(payload: OpenAIStreamPayload) {
        return await fetch("https://api.openai.com/v1/chat/completions", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
            },
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    async getCompletionStream(payload: OpenAIStreamPayload) {
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        let counter = 0;

        const res = await this.getFetchedResponse(payload);

        const stream = new ReadableStream({
            async start(controller) {
                // callback
                function onParse(event: ParsedEvent | ReconnectInterval) {
                    if (event.type === "event") {
                        const data = event.data;
                        // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
                        if (data === "[DONE]") {
                            controller.close();
                            return;
                        }
                        try {
                            const json = JSON.parse(data);
                            const text = json.choices[0].delta?.content || "";
                            if (counter < 2 && (text.match(/\n/) || []).length) {
                                // this is a prefix character (i.e., "\n\n"), do nothing
                                return;
                            }
                            const queue = encoder.encode(text);
                            controller.enqueue(queue);
                            counter++;
                        } catch (e) {
                            // maybe parse error
                            controller.error(e);
                        }
                    }
                }

                // stream response (SSE) from OpenAI may be fragmented into multiple chunks
                // this ensures we properly read chunks and invoke an event for each SSE event stream
                const parser = createParser(onParse);
                // https://web.dev/streams/#asynchronous-iteration
                for await (const chunk of res.body as any) {
                    parser.feed(decoder.decode(chunk));
                }
            },
        });

        return stream;
    },
};

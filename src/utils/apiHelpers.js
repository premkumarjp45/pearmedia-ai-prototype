

const getHFToken = () => {

    const hftToken = process.env.REACT_APP_HF_TOKEN
    return hftToken
}


const enhancementSystemPrompt = "You are an expert prompt engineer for AI image generation. Transform the following simple request into a vivid, 50-word descriptive masterpiece. Include specific details about lighting (e.g., golden hour, soft ambient), camera angle (e.g., low angle, bird's eye view), and artistic style (e.g., cinematic, oil painting, cyberpunk). Output ONLY the enhanced prompt, no explanations.";


const hfFetchWithRetry = async (
    url,
    options,
    maxRetries = 3
) => {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        const response = await fetch(url, options);

        if (response.status === 503) {
            const body = await response.json().catch(() => ({}));
            const waitSec = Math.min(body.estimated_time ?? 20, 30);

            console.warn(
                `Model loading (attempt ${attempt + 1}/${maxRetries}), retrying in ${waitSec}s…`
            );

            await new Promise((r) => setTimeout(r, waitSec * 1000));
            continue;
        }

        //console.log(response)
        return response;
    }

    throw new Error(
        "Model failed to load after multiple retries. Please try again later."
    );
};

const chatCompletion = async (
    token,
    systemPrompt,
    userMessage,
    maxTokens = 200,
    temperature = 0.8
) => {
    try {
        const response = await hfFetchWithRetry("https://router.huggingface.co/together/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "Qwen/Qwen2.5-7B-Instruct-Turbo",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userMessage },
                ],
                max_tokens: maxTokens,
                temperature,
            }),
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => null);
            console.error("HF API Error:", errData);

            throw new Error(
                errData?.error?.message ||
                errData?.error ||
                `API error ${response.status}`
            );
        }

        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content;

        if (!text) throw new Error("No response from text model.");

        return text.trim();
    } catch (error) {
        console.error("chatCompletion failed:", error);
        throw error;
    }
};


export const getEnhancedPrompt = async (userPrompt) => {
    const hftToken = getHFToken();

    try {
        const result = await chatCompletion(
            hftToken,
            enhancementSystemPrompt,
            `User request: "${userPrompt}"`,
            200,
            0.8
        );

        console.log(result)
        return result;
    } catch (error) {
        console.error("Prompt enhancement failed:", error);
        throw error;
    }
};


export const generateImage = async (prompt) => {
    const hftToken = getHFToken();

    try {
        const response = await hfFetchWithRetry(
            `${"https://router.huggingface.co/hf-inference/models"}/${"black-forest-labs/FLUX.1-schnell"}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${hftToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) {
            const errData = await response.json().catch(() => null);
            throw new Error(
                errData?.error || `Image generation error ${response.status}`
            );
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob)
        return imageUrl
    } catch (error) {
        console.error("Image generation failed:", error);
        throw error;
    }
};




const base64ToBlob = (base64) => {
    try {
        const byteString = atob(base64)
        const bytes = new Uint8Array(byteString.length)

        for (let i = 0; i < byteString.length; i++) {
            bytes[i] = byteString.charCodeAt(i)
        }

        return new Blob([bytes], { type: "image/png" })
    } catch (e) {
        console.log(e)
    }
}


const getCaption = async (base64) => {
    try {
        const blob = base64ToBlob(base64)
        console.log(blob, "BLOB")
        const hftToken = getHFToken();
        const res = await fetch(
            "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${hftToken}`,
                },
                body: blob,
            }
        )

        const data = await res.json()
        return data?.[0]?.generated_text || ""
    } catch (e) {
        console.log(e)
    }
}

const analyzeText = (caption) => {
    try {
        const text = caption
        console.log(text)

        // simple colors
        const colors = []
        if (text.includes("green")) colors.push("green")
        if (text.includes("blue")) colors.push("blue")
        if (text.includes("red")) colors.push("red")

        // simple style
        let style = "realistic"
        if (text.includes("painting")) style = "painting"
        if (text.includes("sketch")) style = "sketch"

        return { colors, style }
    } catch (e) {
        console.log(e)
    }
}


export const analyzeImage = async (base64) => {
    try {
        const caption = await getCaption(base64)
        console.log(caption)
        const { colors, style } = analyzeText(caption)

        return {
            objects: caption,
            colors,
            style,
        }
    } catch (e) {
        console.log(e)
    }
}
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const runPromt = async () => {
    try {
        const prompt = "Tell me a joke";
        const result = await openai.completions.create({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 2048,
        });
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
}

export default runPromt;
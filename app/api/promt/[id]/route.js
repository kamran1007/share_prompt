import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

//PATCH (update)

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

//delete
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        console.log("Database connection established");
        console.log(Prompt)
        const deletedPrompt = await Prompt.findByIdAndDelete(params.id);
        if (!deletedPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        console.log("Prompt deleted successfully");
        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return new Response("Error deleting prompt", { status: 500 });
    }
};

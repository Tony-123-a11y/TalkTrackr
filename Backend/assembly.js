
import {AssemblyAI} from 'assemblyai';

export async function assembly(){
const assemblyKey= process.env.ASSEMBLYAI_API_KEY;
 const client = new AssemblyAI({
    apiKey: assemblyKey,
  });

  const transcriber = client.streaming.transcriber({
    sampleRate: 16_000,
    formatTurns: true,
  });

  transcriber.on("open", ({ id }) => {
    console.log(`Session opened with ID: ${id}`);
  });
  transcriber.on("error", (error) => {
    console.error("Error:", error);
  });
  transcriber.on("close", (code, reason) =>
    console.log("Session closed:", code, reason)
  );
  transcriber.on("turn", (turn) => {
    if (!turn.transcript) {
      return;
    }
    console.log("Turn:", turn.transcript);
  });
  await transcriber.connect()

}
import { saveUserData } from "@/lib/db/queries";



export async function POST(request: Request) {
  const body = await request.json()
  console.log(body);

  await saveUserData({
    id: "randomId",
    name: body.name,
    friendDescriptions: body.friendDescriptions,
    motivations: body.motivations,
    challenges: body.challenges,
    leadership: body.leadership,
    extracurriculars: body.extracurriculars,
    seeYou: body.seeYou,
    storyStyle: body.storyStyle,
    personalQualities: body.personalQualities,
    futureImpact: body.futureImpact,
    academicStrenght: body.academicStrenght,
    introduction: body.introduction,
    keyMoments: body.keyMoments,
    fiveSec: body.fiveSec,
    digDeeper: body.digDeeper,
  })

  return new Response("Success")
}

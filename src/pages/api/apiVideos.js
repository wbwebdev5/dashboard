 export const uploadVideo = async (object) => {
  
  const request = await fetch(
    'http://localhost:3977/api/v1//video/upluadVideoFiles',
    {
      method: 'POST'
    },
    {
      body: {
        videoName: object.videoName,
        videoContent: object.video,
        shortName: object.shortName,
        shortContent: object.shortContent,
        previewName: object.previewName,
        previewContent: object.previewContent,
        miniatureName: object.miniatureName,
        miniatureContent: object.miniatureContent,
        title: object.title,
        description: object.description,
        categories: [{category: "6436d9e2c348c5bd3e389367"}],
        models: [{model: "6436e0fb119019f4e15d4053"}, {model: "6436e0f6119019f4e15d4051"}],
        quality: object.quality,
        duration: object.duration,
        page: object.page,
      }
    },
  );
  const response = await request.json()
  if (response) {
    console.log(response)
    return response;
  } else {
    console.log("An error ocurred");
  }
 }
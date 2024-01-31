export async function getVideos(inputString: string) {
  const inputJson = JSON.parse(inputString);
  let pageToken = inputJson["pageToken"];

  let requestUrl = "https://open.tiktokapis.com/v2/video/list?fields=id,title,video_description,duration,cover_image_url,embed_link";
  let requestBody;

  if (pageToken == null) {
    requestBody = `{"maxCount": 20}`;
  } else {
    pageToken = parseInt(pageToken);
    requestBody = `{"maxCount": 20, "cursor": ${pageToken}}`;
  }

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer act.Vp9Y2Nk1qeUK5fg8KECWTqoyHmCcJDNxCU3RAufQlqmSWAWba7x334fjV964!4998.e1"
    },
    body: requestBody,
  }).then((response) => response.json());

  let outputString;

  if (response.hasMore === false || response.statusCode !== 200) {
    outputString = JSON.stringify({
      data: response,
      nextPageToken: "",
    });
  } else {
    outputString = JSON.stringify({
      data: response,
      nextPageToken: response.cursor.toString(),
    });
  }

  console.log('output', outputString);
  return outputString;
}

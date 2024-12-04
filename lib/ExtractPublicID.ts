export default function extractPublicIdsFromUrls(urls: string[]): (string)[] {
  // extract name of file from each URL
  const regex = /\/v\d+\/(.+?)\./;

  // Iterate over the array and extract public ID for each URL
  return urls.map((url) => {
  const match = url.match(regex);
  return match ? match[1] : '';
});
}

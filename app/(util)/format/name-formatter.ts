export const getImageName = (image: string, id?: number) => {
  const [path] = image.split("|");
  return `${path}${id || "1"}.jpg`;
};

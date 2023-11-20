/**
 *
 * @param {Blob} blob
 * @returns
 */
const blobToData = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

module.exports = blobToData;

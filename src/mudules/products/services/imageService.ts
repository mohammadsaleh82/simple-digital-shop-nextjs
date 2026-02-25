export const getImages = async (productId: string) => {
  if (productId) {
    const result = await fetch(`/api/image?productId=${productId}`);
    const data = await result.json();
    return data;
  }
  return null;
};

export const uploadImageToServer = async (image: File, productId: string) => {
  if (!image || !productId) {
    alert('please select image');
    return null;
  }
  const formData = new FormData();
  formData.append('productId', productId);
  formData.append('image', image);
  const result = await fetch('/api/image', {
    method: 'POST',
    body: formData,
  });
  const { data } = await result.json();
  return data;
};

export const deleteImage = async (imageId: string) => {
  const result = await fetch('/api/image?id=' + imageId, {
    method: 'DELETE',
  });
  const message = await result.json();
  return message;
};

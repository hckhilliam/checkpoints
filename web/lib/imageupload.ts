const config = process.env['CLOUDINARY'];
const cloudName = config['cloud_name'];

const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

function upload(image: File): Promise<Checkpoints.Picture> {
  const formData = new FormData();
  formData.append('upload_preset', 'qbevt0ug');
  formData.append('file', image);
  return fetch(uploadUrl, {
    method: 'POST',
    body: formData
  }).then(response => response.json())
    .then(image => {
      return {
        url: image.secure_url,
        width: image.width,
        height: image.height
      } as Checkpoints.Picture;
    });
}

export default upload;
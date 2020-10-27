console.log('loading...');

const ready = callback => {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};

ready(() => {
  console.log('loaded');

  const uploadToDisk = document.querySelector('#uploadToDisk');
  const uploadToAWS = document.querySelector('#uploadToAWS');
  const uploadToAzure = document.querySelector('#uploadToAzure');
  const uploadToGCP = document.querySelector('#uploadToGCP');
  const fileInput = document.querySelector('input[type="file"]');
  const result = document.querySelector('.result');

  handleClick = e => {
    const target = e.target.dataset.target;
    result.classList.remove('error');
    result.innerHTML = 'Uploading...';

    const files = fileInput.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    fetch(`/upload/${target}`, {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        result.innerHTML = `Uploaded successfully.`;
      })
      .catch(err => {
        console.error(err);
        result.innerHTML = `Error: ${err.message}`;
        result.classList.add('error');
      });
  };

  uploadToDisk.addEventListener('click', handleClick);
  uploadToAWS.addEventListener('click', handleClick);
  uploadToAzure.addEventListener('click', handleClick);
  uploadToGCP.addEventListener('click', handleClick);
});

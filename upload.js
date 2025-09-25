const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const videoPreview = document.getElementById('videoPreview');
const uploadPost = document.querySelector('.uploadPost');

// Handle file selection
fileInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;

  handleFile(file);
});

// Handle drag and drop
uploadPost.addEventListener('dragover', function (event) {
  event.preventDefault();
  uploadPost.style.borderColor = '#c94646';
});

uploadPost.addEventListener('dragleave', function (event) {
  event.preventDefault();
  uploadPost.style.borderColor = '#ccc';
});

uploadPost.addEventListener('drop', function (event) {
  event.preventDefault();
  uploadPost.style.borderColor = '#ccc';

  const file = event.dataTransfer.files[0];
  if (!file) return;

  handleFile(file);
});

// Function to handle file preview
function handleFile(file) {
  const fileURL = URL.createObjectURL(file);
  const fileType = file.type.split('/')[0]; // Get "image" or "video"

  // Hide the upload box
  uploadPost.style.display = "none";

  // Show the appropriate preview based on file type
  if (fileType === "image") {
    imagePreview.src = fileURL;
    imagePreview.style.display = "block";
  } else if (fileType === "video") {
    videoPreview.src = fileURL;
    videoPreview.style.display = "block";
  }
}

document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      if (file.type.startsWith('image/')) {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
        document.getElementById('videoPreview').style.display = 'none';

        // Save the image to localStorage
        const uploadedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
        uploadedImages.push(e.target.result);
        localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));
      } else if (file.type.startsWith('video/')) {
        const videoPreview = document.getElementById('videoPreview');
        videoPreview.src = e.target.result;
        videoPreview.style.display = 'block';
        document.getElementById('imagePreview').style.display = 'none';

        // Save the video to localStorage
        localStorage.setItem('uploadedVideo', e.target.result);
      }
    };
    reader.readAsDataURL(file);
  }
});

// Add an event listener for the submit button
document.getElementById('UploadButton').addEventListener('click', function() {
  alert('Media Uploaded!!');
  window.location.href = 'index.html';
});
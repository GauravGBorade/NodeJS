document.addEventListener("DOMContentLoaded", function () {
  // This event listener waits for the DOM to be fully loaded before executing the code inside the function.

  const avatarInput = document.getElementById("avatar");
  const imagePreviewContainer = document.getElementById("imagePreview");

  // Get the input element and the container for the image preview.

  avatarInput.addEventListener("change", function () {
    // Add an event listener to the file input that triggers when the user selects a file.

    const file = avatarInput.files[0];
    // Get the selected file from the input element.

    reader.readAsDataURL(file);
    // Read the selected file as a data URL (base64-encoded string) so it can be used as the image source.

    if (file) {
      // Check if a file is selected.

      const reader = new FileReader();
      // Create a new FileReader object to read the selected file.

      reader.addEventListener("load", function () {
        // Add an event listener to the FileReader that triggers when the file is loaded.
        const image = new Image();

        image.src = reader.result;
        // Create a new Image element and set its source to the data URL obtained from the FileReader.

        image.style.width = "100px"; // Set the width of the preview image (you can change this as needed).
        image.style.height = "100px"; // Set the height of the preview image (you can change this as needed).

        imagePreviewContainer.innerHTML = "";
        // Clear any existing preview before adding the new one.

        imagePreviewContainer.appendChild(image);
        // Append the image element to the container, displaying the selected image preview.
      });
    } else {
      // If no file is selected, clear the image preview container.
      imagePreviewContainer.innerHTML = "";
    }
  });
});

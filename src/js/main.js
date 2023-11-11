function setBackgroundImage() {
    // Path to the images folder
    const folderPath = '../images/';
  
    // Fetch the list of files in the "images" folder
    fetch(folderPath)
      .then(response => response.json()) // assuming the server returns a JSON with file names
      .then(files => {
        // Filter out non-image files if needed
        const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
  
        // Get the count of images
        const imageCount = imageFiles.length;
  
        // Generate a random number between 0 and imageCount - 1
        const randomIndex = Math.floor(Math.random() * imageCount);
  
        // Get the random image file name
        const randomImage = imageFiles[randomIndex];
        console.log(randomImage);
        document.body.style.backgroundImage = randomImage;
      })
      .catch(error => console.error('Error fetching images:', error));
  }
  
  // Call the function to get a random image
setBackgroundImage();  
export function useUpload(){
  const handleUpload = async (fileInput, baseApiUrl) => {
    try {
      const formData = new FormData();
      // Menambahkan file ke FormData
      formData.append("file", fileInput, fileInput.name);
      return await $fetch(`${baseApiUrl}/upload/`, {
        method: "POST",
        body: formData,
      }).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { handleUpload };
}
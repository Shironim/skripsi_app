export function useUtils() {
  const renameFile = (oldName) => {
    const newName = oldName.toLocaleLowerCase().split(" ").join("-");
    return newName;
  };
  const convertStringToArray = (str) => {
    // Menghapus karakter "[" dan "]" dari string
    const stringWithoutBrackets = str.replace(/\[|\]/g, "");
    // Memisahkan string berdasarkan koma dan mengonversi ke dalam bentuk array
    const arrayFromString = stringWithoutBrackets.split(",").map(Number);

    return arrayFromString;
  };
  const capitalizeFirstLetter = (word) => {
    // Mengonversi huruf pertama menjadi kapital dan menggabungkan dengan sisa kata
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  const generateRandomCode = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Karakter yang akan digunakan dalam kode invoice
    let randomCode = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters.charAt(randomIndex);
    }
    return randomCode;
  };

  return { renameFile, convertStringToArray, capitalizeFirstLetter, generateRandomCode };
}

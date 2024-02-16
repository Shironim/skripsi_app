export function useDateFormat() {
  const formatDateTime = (inputDate) => {
    if (inputDate !== null) {
      const date = new Date(inputDate); // Mengonversi string tanggal ke objek Date
      const year = date.getFullYear(); // Mendapatkan tahun
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Mendapatkan bulan (ditambah 1 karena bulan dimulai dari 0)
      const day = String(date.getDate()).padStart(2, "0"); // Mendapatkan hari
      const hour = String(date.getHours()); // Mendapatkan hari
      const minute = String(date.getMinutes()); // Mendapatkan hari
      return `${day}/${month}/${year}, ${hour}:${minute} WIB`;
    }
    return "-";
  };

  const toDate = (inputDate) => {
    const date = new Date(inputDate); // Mengonversi string tanggal ke objek Date
    const year = date.getFullYear(); // Mendapatkan tahun
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mendapatkan bulan (ditambah 1 karena bulan dimulai dari 0)
    const day = String(date.getDate()).padStart(2, "0"); // Mendapatkan hari
    return `${day}/${month}/${year}`;
  };

  return { formatDateTime, toDate };
}

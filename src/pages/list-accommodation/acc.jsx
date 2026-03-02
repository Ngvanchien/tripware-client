const fetchData = async () => {
  setLoading(true);
  try {
    const allAcc = [];
    const startPage = 0;
    const endPage = 10;
    const searchQuery = "amenities~Hồ bơi";

    for (let i = startPage; i <= endPage; i++) {
      const res = await get(
        `accommodations?accommodation=${encodeURIComponent(
          searchQuery
        )}&page=${i}`
      );
      const items = res?.data?.items || [];
      allAcc.push(...items);
    }

    setData(allAcc);
  } catch (err) {
    console.error(err);
    message.error("Không lấy được danh sách chỗ ở!");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchData();
}, []);
// Lấy danh sách theo tìm kiếm bằng get

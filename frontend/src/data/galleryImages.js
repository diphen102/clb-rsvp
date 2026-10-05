// Danh sách ảnh cho phần Gallery. Muốn thêm ảnh mới: bỏ file đã resize
// (~1000px chiều rộng, quality ~75) vào assets/gallery/, import + khai báo thêm ở đây.
import g01 from '../assets/gallery/gallery-01.jpg';
import g02 from '../assets/gallery/gallery-02.jpg';
import g03 from '../assets/gallery/gallery-03.jpg';
import g04 from '../assets/gallery/gallery-04.jpg';
import g05 from '../assets/gallery/gallery-05.jpg';
import g06 from '../assets/gallery/gallery-06.jpg';
import g07 from '../assets/gallery/gallery-07.jpg';
import g08 from '../assets/gallery/gallery-08.jpg';
import g09 from '../assets/gallery/gallery-09.jpg';
import g10 from '../assets/gallery/gallery-10.jpg';
import g11 from '../assets/gallery/gallery-11.jpg';
import g12 from '../assets/gallery/gallery-12.jpg';
import g13 from '../assets/gallery/gallery-13.jpg';
import g14 from '../assets/gallery/gallery-14.jpg';
import g15 from '../assets/gallery/gallery-15.jpg';
import g16 from '../assets/gallery/gallery-16.jpg';
import g17 from '../assets/gallery/gallery-17.jpg';
import g18 from '../assets/gallery/gallery-18.jpg';
import g19 from '../assets/gallery/gallery-19.jpg';
import g20 from '../assets/gallery/gallery-20.jpg';
import g21 from '../assets/gallery/gallery-21.jpg';
import g22 from '../assets/gallery/gallery-22.jpg';
import g23 from '../assets/gallery/gallery-23.jpg';
import g24 from '../assets/gallery/gallery-24.jpg';
import g25 from '../assets/gallery/gallery-25.jpg';
import g26 from '../assets/gallery/gallery-26.jpg';
import g27 from '../assets/gallery/gallery-27.jpg';
import g28 from '../assets/gallery/gallery-28.jpg';
import g29 from '../assets/gallery/gallery-29.jpg';
import g30 from '../assets/gallery/gallery-30.jpg';
import g31 from '../assets/gallery/gallery-31.jpg';
import g32 from '../assets/gallery/gallery-32.jpg';
import g33 from '../assets/gallery/gallery-33.jpg';
import g34 from '../assets/gallery/gallery-34.jpg';
import g35 from '../assets/gallery/gallery-35.jpg';
import g36 from '../assets/gallery/gallery-36.jpg';
import g37 from '../assets/gallery/gallery-37.jpg';
import g38 from '../assets/gallery/gallery-38.jpg';
import g39 from '../assets/gallery/gallery-39.jpg';
import g40 from '../assets/gallery/gallery-40.jpg';


// Trộn lẫn các bức ảnh hoài niệm lịch sử (g33 - g39) vào dòng chảy ký ức
const galleryImages = [
  g01, g02, g33, g03, g04, g34, g05, g06, g35, g07, g08, g09, g36,
  g10, g11, g12, g37, g13, g14, g15, g38, g16, g17, g18, g39, g19,
  g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g40
].map((src) => ({ src, alt: 'Hoạt động CLB Sinh Nhật Hồng Tuổi 18 - Hiến máu cứu người' }));

export default galleryImages;


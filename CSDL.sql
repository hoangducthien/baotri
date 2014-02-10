-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2014 at 05:26 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bao_tri_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tableaccount`
--

CREATE TABLE IF NOT EXISTS `tableaccount` (
  `MaSo` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `TenNV` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `TaiKhoan` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `MatKhau` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ChucVu` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `QuyenHan` varchar(20) NOT NULL,
  PRIMARY KEY (`MaSo`),
  UNIQUE KEY `TaiKhoan` (`TaiKhoan`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tableaccount`
--

INSERT INTO `tableaccount` (`MaSo`, `TenNV`, `TaiKhoan`, `MatKhau`, `ChucVu`, `QuyenHan`) VALUES
('AD01', 'Mã Văn A', 'AD01', '696d29e0940a4957748fe3fc9efd22a3', 'ad', '0'),
('GD01', 'Hoàng Văn A', 'GD01', '696d29e0940a4957748fe3fc9efd22a3', 'gd', '5,8,'),
('GS01', 'Nguyễn Mạnh A', 'GS01', '696d29e0940a4957748fe3fc9efd22a3', 'gs', '2,3,5,'),
('GS02', 'Nguyễn Mạnh B', 'GS02', '696d29e0940a4957748fe3fc9efd22a3', 'gs', '2,3,5,'),
('NVBT01', 'Nguyễn Văn AAA', 'NVBT01', '696d29e0940a4957748fe3fc9efd22a3', 'nvbt', '1,2,3,5,'),
('NVBT02', 'Nguyễn Văn B', 'NVBT02', '696d29e0940a4957748fe3fc9efd22a3', 'nvbt', '1,2,3,5,'),
('NVBT03', 'Nguyễn Văn C', 'NVBT03', '696d29e0940a4957748fe3fc9efd22a3', 'nvbt', '1,2,3,5,'),
('NVBT04', 'Nguyễn Văn D', 'NVBT04', '696d29e0940a4957748fe3fc9efd22a3', 'nvbt', '1,2,3,5,'),
('NVSX01', 'Nguyễn Thị A', 'NVSX01', '696d29e0940a4957748fe3fc9efd22a3', 'nvsx', '2,5,'),
('NVSX02', 'Nguyễn Thị B', 'NVSX02', '696d29e0940a4957748fe3fc9efd22a3', 'nvsx', '2,5,'),
('NVSX03', 'Nguyễn Thị C', 'NVSX03', '696d29e0940a4957748fe3fc9efd22a3', 'nvsx', '2,5,'),
('NVSX04', 'Nguyễn Thị D', 'NVSX04', '696d29e0940a4957748fe3fc9efd22a3', 'nvsx', '2,5,'),
('TPBT01', 'Kim Thị A', 'TPBT01', '696d29e0940a4957748fe3fc9efd22a3', 'tpbt', '1,2,3,4,5,'),
('TPQL01', 'Trần Thị A', 'TPQL01', '696d29e0940a4957748fe3fc9efd22a3', 'tpql', '2,5,6,');

-- --------------------------------------------------------

--
-- Table structure for table `tablechitietthietbi`
--

CREATE TABLE IF NOT EXISTS `tablechitietthietbi` (
  `ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `MaSo` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `I1` bigint(20) NOT NULL,
  `L1` bigint(20) NOT NULL,
  `R1` bigint(20) NOT NULL,
  `I11` bigint(20) NOT NULL,
  `I2` bigint(20) NOT NULL,
  `L2` bigint(20) NOT NULL,
  `R2` bigint(20) NOT NULL,
  `I12` bigint(20) NOT NULL,
  `ChiTietCha` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ChiTietCon` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `TrangThai` tinyint(4) NOT NULL DEFAULT '1',
  `I3` bigint(20) NOT NULL,
  `L3` bigint(20) NOT NULL,
  `R3` bigint(20) NOT NULL,
  `I13` bigint(20) NOT NULL,
  `LoaiChiTiet` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `MaSo` (`MaSo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tablechucvu`
--

CREATE TABLE IF NOT EXISTS `tablechucvu` (
  `MaSo` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ChucVu` varchar(60) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`MaSo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tablechucvu`
--

INSERT INTO `tablechucvu` (`MaSo`, `ChucVu`) VALUES
('ad', 'Administrator'),
('gd', 'Giám Đốc'),
('gs', 'Giám Sát'),
('nvbt', 'Nhân Viên Bảo Trì'),
('nvsx', 'Nhân Viên Sản Xuất'),
('tpbt', 'Trưởng Phòng Bảo Trì'),
('tpql', 'Trưởng Phòng Quản Lý');

-- --------------------------------------------------------

--
-- Table structure for table `tablecongviecbaotri`
--

CREATE TABLE IF NOT EXISTS `tablecongviecbaotri` (
  `ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `MaSo` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Ten` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tablekehoachbaotri`
--

CREATE TABLE IF NOT EXISTS `tablekehoachbaotri` (
  `ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `MaSo` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Ten` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `NgayBatDau` date NOT NULL,
  `NgayKetThuc` date NOT NULL,
  `DanhSachThietBi` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tableloaichitiet`
--

CREATE TABLE IF NOT EXISTS `tableloaichitiet` (
  `ID` mediumint(11) NOT NULL AUTO_INCREMENT,
  `MaSo` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Ten` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ThoiGianBaoTri` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Level` tinyint(4) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=300 ;

--
-- Dumping data for table `tableloaichitiet`
--

INSERT INTO `tableloaichitiet` (`ID`, `MaSo`, `Ten`, `ThoiGianBaoTri`, `Level`) VALUES
(1, 'I.1', 'Các bu lông lắp ghép, mối hàn', 'I,,,,,,,,', 1),
(2, 'I.2', 'Bồn chứa', 'I,,,,,,,,', 1),
(3, 'I.3', 'Động cơ điện', ',,,,,,,,', 1),
(4, 'I.3.1', 'Rô to', ',,,,,I,,,', 2),
(5, 'I.3.2', 'Satato', ',,,,,I,,,', 2),
(6, 'I.3.3', 'Vòng bi', 'I,L,,,,R,,,', 2),
(7, 'I.3.4', 'Kiểm tra cường độ dòng diện khi máy đang hoạt động', 'I,,,,,,,,,', 2),
(8, 'I.4', 'Truyền động đai', ',,,,,,,,', 1),
(9, 'I.4.1', 'Puly', ',I,,,,,,R,', 2),
(10, 'I.4.2', 'Đai thang', 'I,I,,,R,,,,', 2),
(11, 'I.5', 'Trục khuấy, cánh khuấy', ',,,,,,,,', 1),
(12, 'I.5.1', 'Trục khuấy, cánh khuấy', 'I,,,,,,,,', 2),
(13, 'I.5.2', 'Vòng bi', 'I,,,,R,,,,', 2),
(14, 'I.6', 'Mở bôi trơn', ',,,R,,R,,,', 1),
(15, 'I.7', 'Hệ thống điện động lực, điều khiển', 'I,,,I1,,,,,', 1),
(16, 'I.8', 'Sơn', ',,,,,,,,R', 1),
(17, 'II.1', 'Các bu lông lắp ghép, mối hàn', 'I,,,,,,,,', 1),
(18, 'II.2', 'Động cơ điện', ',,,,,,,,', 1),
(19, 'II.2.1', 'Rô to', ',,,,,I,,,', 2),
(20, 'II.2.2', 'Satato', ',,,,,I,,,', 2),
(21, 'II.2.3', 'Vòng bi', 'I,L,,,,R,,,', 2),
(22, 'II.2.4', 'Kiểm tra cường độ dòng điện khi máy đang hoạt động', 'I,,,,,,,,', 2),
(23, 'II.3', 'Hộp giảm tốc', ',,,,,,,,', 1),
(24, 'II.3.1', 'Dầu nhớt', 'I,L,,R,,R,,,', 2),
(25, 'II.3.2', 'Bánh răng', ',,,,,I,,,', 2),
(26, 'II.3.3', 'Vòng bi', 'I,,,,,R,,,', 2),
(27, 'II.3.4', 'Phốt', 'I,,,,,R,,,', 2),
(28, 'II.4', 'Truyền động đai', ',,,,,,,,', 1),
(29, 'II.4.1', 'Puly', ',I,,,,,,R,', 2),
(30, 'II.4.2', 'Đai thang', 'I,I,,,R,,,,', 2),
(31, 'II.5', 'Trục khuấy, cánh khuấy', 'I,,,,,,,,', 0),
(32, 'II.6', 'Khung máy', 'I,,,,,,,,', 0),
(33, 'II.7', 'Mở bôi trơn', ',,,R,,R,,,', 0),
(34, 'II.8', 'Hệ thống điện động lực, điều khiển', 'I,,,I1,,,,,', 0),
(35, 'II.9', 'Sơn', ',,,,,,,,R', 0),
(36, 'III.1', 'Các bu lông lắp ghép, mối hàn, dây cáp', 'I,,,,,,,,', 1),
(37, 'III.2', 'Vòng bi', 'I,L,,,,R,,,', 1),
(38, 'III.3', 'Sơn', ',,,,,,,,R', 1),
(39, 'IV.1', 'Các bu lông lắp ghép, mối hàn', 'I,,,,,,,,', 1),
(40, 'IV.2', 'Động cơ điện', ',,,,,,,,', 1),
(41, 'IV.2.1', 'Rô to', ',,,,,I,,,', 2),
(42, 'IV.2.2', 'Satato', ',,,,,I,,,', 2),
(43, 'IV.2.3', 'Vòng bi', 'I,L,,,,R,,,', 2),
(44, 'IV.2.4', 'Kiểm tra cường độ dòng điện khi máy hoạt động', 'I,,,,,,,,', 2),
(45, 'IV.3', 'Hộp giảm tốc', ',,,,,,,,', 1),
(46, 'IV.3.1', 'Kiểm tra thông hơi hộp giảm tốc', ',I,,,,,,,', 2),
(47, 'IV.3.2', 'Dầu nhớt', 'I,L,,R,,R,,,', 2),
(48, 'IV.3.3', 'Bánh răng', ',,,,,I,,,', 2),
(49, 'IV.3.4', 'Vòng bi', 'I,,,,,R,,,', 2),
(50, 'IV.3.5', 'Phốt', 'I,,,,,R,,,', 2),
(51, 'IV.4', 'Truyền động đai', ',,,,,,,,', 1),
(52, 'IV.4.1', 'Puly', ',I,,,,,,R,', 2),
(53, 'IV.4.2', 'Đai thang', 'I,I,,,R,,,,', 2),
(54, 'IV.5', 'Truyền động xích', ',,,,,,,,', 1),
(55, 'IV.5.1', 'Đĩa xích', 'I,,,,,,,,', 2),
(56, 'IV.5.2', 'Xích', 'I,L,,,,,,,', 2),
(57, 'IV.6', 'Truyền động bánh răng', 'I+L,,,,,,,R,', 1),
(58, 'IV.7', 'Trục cản', 'I,,,,,,,,', 1),
(59, 'IV.7.1', 'Bề mặt làm việc trục cán', 'I,,,,,,,,', 2),
(60, 'IV.7.2', 'Điều chỉnh khe hở trục cán', 'I,,,,,,,,', 2),
(61, 'IV.7.3', 'Vòng bi', 'I,L,,,,R,,,', 2),
(62, 'IV.7.4', 'Gối đỡ vòng bi', ',,,,,,,,', 2),
(63, 'IV.7.5', 'Phốt', 'I,,,,,R,,,', 2),
(64, 'IV.7.6', 'Vít chỉnh trục cán', 'I,L,,,,,,,', 2),
(65, 'IV.8', 'Bộ phận di chuyển', ',,,,,,,,', 1),
(66, 'IV.8.1', 'Bánh xe', 'I,,,,,,,R,', 2),
(67, 'IV.8.2', 'Vòng bi', 'I,L,,,,,,R,', 2),
(68, 'IV.9', 'Khung máy', 'I,,,,,,,,', 1),
(69, 'IV.10', 'Mở bôi trơn', ',,,R,,R,,,', 1),
(70, 'IV.11', 'Hệ thống điện động lực, điều khiển', 'I,,,I1,,,,,', 1),
(71, 'IV.12', 'Sơn', ',,,,,,,,R', 1),
(72, 'V.1', 'Các bu lông lắp ghép, mối hàn', 'I,,,,,,,,', 1),
(73, 'V.2', 'Động cơ điện', ',,,,,,,,', 1),
(74, 'V.2.1', 'Rô to', ',,,,,I,,,', 2),
(75, 'V.2.2', 'Satato', ',,,,,I,,,', 2),
(76, 'V.2.3', 'Vòng bi', 'I,L,,,,R,,,', 2),
(77, 'V.2.4', 'Kiểm tra cường độ dòng điện khi máy hoạt động', 'I,,,,,,,,', 2),
(78, 'V.3', 'Hộp giảm tốc', ',,,,,,,,', 2),
(79, 'V.3.1', 'Dầu nhớt', 'I,L,,R,,R,,,', 2),
(80, 'V.3.2', 'Bánh răng', ',,,,,I,,,', 2),
(81, 'V.3.3', 'Vòng bi', 'I,,,,,R,,,', 2),
(82, 'V.3.4', 'Phốt', 'I,,,,,R,,,', 2),
(83, 'V.4', 'Truyền động xích', ',,,,,,,,', 1),
(84, 'V.4.1', 'Đĩa xích', 'I,,,,,,,,R', 2),
(85, 'V.4.2', 'Xích', 'I,L,,,,,,,R', 2),
(86, 'V.5', 'Băng tải', ',,,,,,,,', 1),
(87, 'V.5.1', 'Băng tải bố', 'I,,,,,,R,,', 2),
(88, 'V.5.2', 'Trống băng tải', 'I,,,,,,,,', 2),
(89, 'V.5.3', 'Trục lăn', 'I,,,,,,,,', 2),
(90, 'V.5.4', 'Vòng bi', 'I+L,,,,,R,,,,', 2),
(91, 'V.6', 'Khung máy', 'I,,,,,,,,', 1),
(92, 'V.7', 'Mở bôi trơn', ',,,R,,R,,,', 1),
(93, 'V.8', 'Hệ thống điện động lực, điều khiển', 'I,,,I1,,,,,', 1),
(94, 'V.9', 'Sơn', ',,,,,,,,R', 1),
(95, 'VI.1', 'Các bu lông lắp ghép, mối hàn', 'I,,,,,,,,', 1),
(96, 'VI.2', 'Động cơ điện', ',,,,,,,,', 1),
(97, 'VI.2.1', 'Rô to', ',,,,,I,,,', 2),
(98, 'VI.2.2', 'Satato', ',,,,,I,,,', 2),
(99, 'VI.2.3', 'Vòng bi', 'I,L,,,R,,,,', 2),
(100, 'VI.2.4', 'Kiểm tra cường độ dòng điện đang hoạt động', 'I,,,,,,,,', 2),
(101, 'VI.3', 'Hộp giảm tốc', ',,,,,,,,', 1),
(102, 'VI.3.1', 'Kiểm tra thông hơi hộp giảm tốc', ',I,,,,,,,', 2),
(103, 'VI.3.2', 'Dầu nhớt', 'I,L,,R,,R,,,', 2),
(104, 'VI.3.3', 'Bánh răng', ',,,,,I,,,', 2),
(105, 'VI.3.4', 'Trục vít', ',,,,,I,,,', 2),
(106, 'VI.3.5', 'Vòng bi', 'I,,,,,R,,,', 2),
(107, 'VI.3.6', 'Phốt', 'I,,,,,R,,,', 2),
(108, 'VI.4', 'Truyền động đai', ',,,,,,,,', 1),
(109, 'VI.4.1', 'Puly', ',I,,,,,,R,', 2),
(110, 'VI.4.2', 'Đai thang', 'I,I,,,R,,,,', 2),
(111, 'VI.5', 'Khớp nối xích', 'I,L,,,,,,R,', 1),
(112, 'VI.6', 'Truyền động bánh răng', 'I+L,,,,,,,R,', 1),
(113, 'VI.7', 'Trục cán', 'I,,,,,,,,', 1),
(114, 'VI.7.1', 'Bề mặt làm việc trục cán', 'I,,,,,,,,', 2),
(115, 'VI.7.2', 'Điều chỉnh khe hở trục cán', 'I,I,,,,,,,', 2),
(116, 'VI.7.3', 'Cắt rãnh trục cán', ',,,R,,,,,', 2),
(117, 'VI.7.4', 'Thay trục cán', ',,,,R,,,,', 2),
(118, 'VI.7.5', 'Vòng bi', 'I,L,,,,R,,,', 2),
(119, 'VI.7.6', 'Bộ măng xông vòng bi', 'I,,,,,I,,R,', 2),
(120, 'VI.7.7', 'Gối đỡ vòng bi', ',,,,,I,,,', 2),
(121, 'VI.7.8', 'Phốt', 'I,,,,,R,,,', 2),
(122, 'VI.7.9', 'Vít chỉnh trục cán', ',L,,,,,,R,', 2),
(123, 'VI.8', 'Khung máy', 'I,,,,,,,,', 1),
(124, 'VI.9', 'Mở bôi trơn', ',,,R,,R,,,', 1),
(125, 'VI.10', 'Hệ thống điện động lực, điều khiển', 'I,,,I1,,,,,', 1),
(126, 'VI.11', 'Sơn', ',,,,,,,,R', 1),
(127, 'VII.1', 'Các bu lông lắp ghép, mối hàn', 'I,,,,,,,,', 1),
(128, 'VII.2', 'Động cơ điện', ',,,,,,,,', 1),
(129, 'VII.2.1', 'Rô to', ',,,,,I,,,', 2),
(130, 'VII.2.2', 'Satato', ',,,,,I,,', 2),
(131, 'VII.2.3', 'Vòng bi', 'I,L,,,,R,,,', 2),
(132, 'VII.2.4', 'Kiểm tra cường độ dòng điện khi máy đang hoạt động', 'I,,,,,,,,', 2),
(133, 'VII.3', 'Hộp giảm tốc', ',,,,,,,,', 1),
(134, 'VII.3.1', 'Kiểm tra thông hơi hộp giảm tốc', ',I,,,,,,,', 2),
(135, 'VII.3.2', 'Dầu nhớt', 'I,L,,R,,R,,,', 2),
(136, 'VII.3.3', 'Bánh răng', ',,,,,I,,,', 2),
(137, 'VII.3.4', 'Trục vít', ',,,,,I,,,', 2),
(138, 'VII.3.5', 'Vòng bi', 'I,,,,,R,,,', 2),
(139, 'VII.3.6', 'Phốt', 'I,,,,,R,,,', 2),
(140, 'VII.4', 'Truyền động đai', ',,,,,,,,', 1),
(141, 'VII.4.1', 'Puly', 'I,I,,,,,,R,', 2),
(142, 'VII.4.2', 'Đai thang', 'I,I,,,,,,R,', 2),
(143, 'VII.6', 'Trục cấp liệu', ',,,,,,,,', 1),
(144, 'VII.6.1', 'Trục cấp liệu', 'I,,,,,,,,', 2),
(145, 'VII.6.2', 'Vòng bi', 'I+L,,,R,,,,,', 2),
(146, 'VII.5', 'Truyền động xích', ',,,,,,,,', 1),
(147, 'VII.5.1', 'Đĩa xích', 'I,,,,,R,,,', 2),
(148, 'VII.5.2', 'Xích', 'I,L,,,,R,,,', 2),
(149, 'VII.7', 'Trục cắt', ',,,,,,,,', 1),
(150, 'VII.7.1', 'Bề mặt làm việc trục cắt', 'I,,,,,,,,', 2),
(151, 'VII.7.2', 'Khoảng hở giữa dao cắt và trục cắt, giữa trục cắt và trục cấp liệu', 'I,,,,,,,,', 2),
(152, 'VII.7.3', 'Vít chỉnh dao cắt', 'I,L,,,,,,R,', 2),
(153, 'VII.7.4', 'Thay đổi mặt làm việc trục cắt', ',,I,,,,,,', 2),
(154, 'VII.7.5', 'Cắt rãnh trục cắt', ',,,R,,,,,', 2),
(155, 'VII.7.6', 'Thay thế trục cắt', ',,,,R,,,,', 2),
(156, 'VII.7.7', 'Vòng bi', 'I+L,,,R,,,,,', 2),
(157, 'VII.7.8', 'Bộ măng xông vòng bi', 'I,,,,,,,R,', 2),
(158, 'VII.7.9', 'Gối đỡ vòng bi', 'I,,,,,I,,,', 2),
(159, 'VII.7.10', 'Phốt', 'I,,,R,,R,,,', 2),
(160, 'VII.8', 'Dao cắt tĩnh', ',,,,,,,,', 1),
(161, 'VII.8.1', 'Kiểm tra độ mài mòn của dao, mài sắc nếu cần', ',,I,,,,,,', 2),
(162, 'VII.8.2', 'Dao cắt tĩnh', 'I,,R,,,,,,', 2),
(163, 'VII.9', 'Khung máy', 'I,,,,,,,,', 1),
(164, 'VII.10', 'Mở bôi trơn', ',,,R,,R,,,', 1),
(165, 'VII.11', 'Hệ thống điện động lực, điều khiển', 'I,,,I1,,,,,', 1),
(166, 'VII.12', 'Sơn', ',,,,,,,,R', 1),
(167, 'VIII.1', 'Các bu lông lắp ghép, mối hàn', 'I,,,,,,,,', 1),
(168, 'VIII.2', 'Động cơ điện', ',,,,,,,,', 1),
(169, 'VIII.2.1', 'Rô to', ',,,,,I,,,', 2),
(170, 'VIII.2.2', 'Satato', ',,,,,I,,,', 2),
(171, 'VIII.2.3', 'Vòng bi', 'I,L,,,,R,,,', 2),
(172, 'VIII.2.4', 'Kiểm tra cường độ dòng điện khi máy đang hoạt động', 'I,,,,,,,,', 2),
(173, 'VIII.3', 'Truyền động đai', ',,,,,,,,', 1),
(174, 'VIII.3.1', 'Puly', 'I,I,,,,,R,', 2),
(175, 'VIII.3.2', 'Đai thang', 'I,I,,,R,,,,', 2),
(176, 'VIII.4', 'Thân và trục bơm', ',,,,,,,,', 1),
(177, 'VIII.4.1', 'Kiểm tra thân bơm và trục bơm', 'I,,,,,,,,', 2),
(178, 'VIII.4.2', 'Phốt', 'I,L,R,,,,,,', 2),
(179, 'VIII.4.3', 'Vòng bi', 'I+L,,,,R,,,,', 2),
(180, 'VIII.4.4', 'Bộ măng xông vòng bi', 'I,,,,,,R,,', 2),
(181, 'VIII.5', 'Khung máy', 'I,,,,,,,,', 2),
(182, 'VIII.6', 'Mở bôi trơn', ',,,R,,R,,,', 1),
(183, 'VIII.7', 'Hệ thống điện động lực, điều khiển', 'I,,,I1,,,,,', 1),
(184, 'VIII.8', 'Sơn', ',,,,,,,,R', 1),
(185, 'IX.1', 'Các bu lông lắp ghép, mối hàn', 'I,,,,,,,,', 1),
(186, 'IX.2', 'Động cơ điện', ',,,,,,,,', 1),
(187, 'IX.2.1', 'Rô to', ',,,,,I,,,', 2),
(188, 'IX.2.2', 'Satato', ',,,,,I,,,', 2),
(189, 'IX.2.3', 'Vòng bi', 'I,L,,,,R,,,', 2),
(190, 'IX.2.4', 'Kiểm tra cường độ dòng điện khi máy đang hoạt động', 'I,,,,,,,,', 2),
(191, 'IX.3', 'Hộp giảm tốc', ',,,,,,,,', 1),
(192, 'IX.3.1', 'Kiểm tra thông hơi hộp giảm tốc', ',I,,,,,,,', 2),
(193, 'IX.3.2', 'Dầu nhớt', 'I,L,,R,,R,,,', 2),
(194, 'IX.3.3', 'Bánh răng', ',,,,,I,,,', 2),
(195, 'IX.3.4', 'Trục vít', ',,,,,I,,,', 2),
(196, 'IX.3.5', 'Vòng bi', 'I,,,,,R,,,', 2),
(197, 'IX.3.6', 'Phốt', 'I,,,,,R,,,', 2),
(198, 'IX.4', 'Truyền động đai', ',,,,,,,,', 1),
(199, 'IX.4.1', 'Puly', ',I,,,,,,R,', 2),
(200, 'IX.4.2', 'Đai thang', 'I,I,,,R,,,,', 2),
(201, 'IX.5', 'Khớp nối xích', 'I,L,,,,,,R,', 1),
(202, 'IX.6', 'Bộ truyền động xích đẩy thùng sấy', ',,,,,,,,', 1),
(203, 'IX.6.1', 'Đĩa xích', 'I,,,,,R,,,', 2),
(204, 'IX.6.2', 'Xích', 'I,L,,,,R,,,', 2),
(205, 'IX.7', 'Đầu đốt, hệ thống cung cấp gas', ',,,,,,,,', 1),
(206, 'IX.7.1', 'Kiểm tra hoạt động của đầu đốt', 'I,,,,,,,,', 2),
(207, 'IX.7.2', 'Kiểm tra đầu đốt, vệ sinh các tiếp điểm', ',I,,,,,,,', 2),
(208, 'IX.7.3', 'Kiểm tra rò rỉ gas, khắc phục', 'I,,,,,,,,', 2),
(209, 'IX.7.4', 'Kiểm tra ghi thông số đồng hồ áp suất ga', 'I,,,,,,,,', 2),
(210, 'IX.7.5', 'Vệ sinh đầu đốt', ',,I,,,,,,', 2),
(211, 'IX.7.6', 'Vệ sinh buồng đốt', ',,,I,,,,,', 2),
(212, 'IX.8', 'Quạt chỉnh, quạt hút ẩm, quạt hồi nhiệt, quạt làm nguội', ',,,,,,,,', 1),
(213, 'IX.8.1', 'Kiểm tra hoạt động ổn định của quạt', 'I,,,,,,,,', 2),
(214, 'IX.8.2', 'Vệ sinh cánh quạt các loại', ',,,I,,,,,', 2),
(215, 'IX.8.3', 'Vòng bi', 'I+L,,,,,R,,,', 2),
(216, 'IX.9', 'Thùng sấy', ',,,,,,,,', 1),
(217, 'IX.9.1', 'Khung thùng sấy, vách ngăn thùng sấy', 'I,,,,,,,,', 2),
(218, 'IX.9.2', 'Bánh xe thùng sấy', 'I,,,,,,R,,', 2),
(219, 'IX.9.3', 'Vòng bi', 'I+L,,,,,R,,,', 2),
(220, 'IX.10', 'Xe đẩy thùng sấy', ',,,,,,,,', 1),
(221, 'IX.10.1', 'Khung xe', 'I,,,,,,,,', 2),
(222, 'IX.10.2', 'Trục bánh xe', 'I,,,,,,,,', 2),
(223, 'IX.10.3', 'Bánh xe', 'I,,,,,,R,,', 2),
(224, 'IX.10.4', 'Vòng bi', 'I+L,,,,,R,,,', 2),
(225, 'IX.11', 'Vệ sinh lò sấy', ',,,,,,,,', 1),
(226, 'IX.11.1', 'Vệ sinh bên trong lò sấy, phải đảm bảo sạch sẽ không còn mủ vụn ở đáy lò', ',,,I,,,,,', 2),
(227, 'IX.11.2', 'Vệ sinh bên ngoài toàn bộ lò sấy', ',,,I,,,,,I', 2),
(228, 'IX.12', 'Hệ thống điện động lực, điều khiển', 'I,,,I1,,,,,', 1),
(229, 'IX.12.1', 'Kiểm tra các đồng hồ báo nhiệt', 'I,,,,,,,,', 2),
(230, 'IX.12.2', 'Kiểm tra đồng hồ báo thời gian', 'I,,,,,,,,', 2),
(231, 'IX.13', 'Mở bôi trơn', ',,,R,,R,,,', 1),
(232, 'IX.14', 'Sơn', ',,,,,,,R,I', 1),
(233, 'X.1', 'Các bu lông lắp ghép, mối hàn', 'I,,,,,,,,', 1),
(234, 'X.2', 'Động cơ điện', ',,,,,,,,', 1),
(235, 'X.2.1', 'Rô to', ',,,,,I,,,', 2),
(236, 'X.2.2', 'Satato', ',,,,,I,,,', 2),
(237, 'X.2.3', 'Vòng bi', 'I,L,,,,R,,,', 2),
(238, 'X.2.4', 'Kiểm tra cường độ dòng điện khi máy hoạt động', 'I,,,,,,,,', 2),
(239, 'X.3', 'Hộp giảm tốc', ',,,,,,,,', 1),
(240, 'X.3.1', 'Kiểm tra thông hơi hộp giảm tốc', ',I,,,,,,,', 2),
(241, 'X.3.2', 'Dầu nhớt', 'I,I,,R,,R,,,', 2),
(242, 'X.3.3', 'Bánh răng', ',,,,,I,,,', 2),
(243, 'X.3.4', 'Trục vít', ',,,,,I,,,', 2),
(244, 'X.3.5', 'Vòng bi', 'I,,,,,R,,,', 2),
(245, 'X.3.6', 'Phốt', 'I,,,,,R,,,', 2),
(246, 'X.4', 'Truyền động đai', ',,,,,,,,', 1),
(247, 'X.4.1', 'Puly', ',I,,,,,,R,', 2),
(248, 'X.4.2', 'Đai thang', 'I,I,,,R,,,,', 2),
(249, 'X.5', 'Cụm tạo rung', ',,,,,,,,', 1),
(250, 'X.5.1', 'Kiểm tra cụm tạo rung', 'I,,,,,,,,', 2),
(251, 'X.5.2', 'Kiểm tra thanh mây', 'I,,,,,,R,,', 2),
(252, 'X.5.3', 'Vòng bi', 'I,,,R,,,,,', 2),
(253, 'X.6', 'Đường ống', 'I,,,,,,,,', 1),
(254, 'X.7', 'Khung, sàn, phểu', ',,,,,,,,', 1),
(255, 'X.7.1', 'Kiểm tra khung, sàn, phểu', 'I,,,,,,,,', 2),
(256, 'X.7.2', 'Vòng bi', 'I,L,,,,R,,,', 2),
(257, 'X.8', 'Mở bôi trơn', ',,,R,,R,,,', 1),
(258, 'X.9', 'Hệ thống điện động lực, điều khiển', 'I,,,I1,,,,,', 1),
(259, 'X.10', 'Sơn', ',,,,,,,,R', 1),
(260, 'XI.1', 'Các bu lông lắp ghép, mối hàn', 'I,,,,,,,,', 1),
(261, 'XI.2', 'Động cơ điện', ',,,,,,,,', 1),
(262, 'XI.2.1', 'Rô to', ',,,,,I,,,', 2),
(263, 'XI.2.2', 'Satato', ',,,,,I,,,', 2),
(264, 'XI.2.3', 'Vòng bi', 'I,L,,,,R,,,', 2),
(265, 'XI.2.4', 'Kiểm tra cường độ dòng điện khi máy đang hoạt động', 'I,,,,,,,,', 2),
(266, 'XI.3', 'Kiểm tra khớp nối vấu', ',I,,,,,,,', 1),
(267, 'XI.4', 'Hệ thống thuỷ lực', ',,,,,,,,', 1),
(268, 'XI.4.1', 'Kiểm tra rò rỉ dầu nhớt', 'I,,,,,,,,', 2),
(269, 'XI.4.2', 'Dầu nhớt thuỷ lực', 'I,L,,,,,R,,', 2),
(270, 'XI.4.3', 'Kiểm tra ghi thông số áp suất làm việc', 'I,,,,,,,,', 2),
(271, 'XI.4.4', 'Kiểm tra hệ thống làm mát dầu nhớt', 'I,,,,,,,,', 2),
(272, 'XI.4.5', 'Bơm thuỷ lực', 'I,,,,,,,R,', 2),
(273, 'XI.4.6', 'Bộ phân phối', 'I,,,,,,,R,', 2),
(274, 'XI.4.7', 'Bộ sin phốt xi lanh chính', 'I,,,,,,R,,', 2),
(275, 'XI.4.8', 'Bộ sin phốt xi lanh đẩy khuôn ép', 'I,,,,,,R,,', 2),
(276, 'XI.4.9', 'Bộ lọc dầu', ',I,,,,,R,,', 2),
(277, 'XI.5', 'Khuôn ép, bàn ép', 'I,L,,,,,,,', 1),
(278, 'XI.5.1', 'Kiểm tra khuôn ép và bản ép', 'I,,,,,,,,', 2),
(279, 'XI.5.2', 'Kiểm tra thanh và bạc dẫn hướng bàn ép', 'I,L,,,,,,,', 2),
(280, 'XI.5.3', 'Rãnh dẫn hướng khuôn ép và bán ép', 'I,L,,,,,,,', 2),
(281, 'XI.5.4', 'Vòng bi', 'I,L,,,,R,,,', 2),
(282, 'XI.5.5', 'Kiểm tra lò xo trên mâm ép vấu móc cao su', 'I,,,,,,,,', 2),
(283, 'XI.6', 'Mở bôi trơn', ',,,R,,R,,,', 1),
(284, 'XI.7', 'Hệ thống điện động lực, điều khiển', 'I,,,I1,,,,,', 1),
(285, 'XI.8', 'Sơn', ',,,,,,,,R', 1),
(286, 'XII.1', 'Các bu lông lắp ghép, mối hàn', ',,,,,,,,', 1),
(287, 'XII.2', 'Trục lăn', 'I,,,,,,,,', 1),
(288, 'XII.3', 'Vòng bi', 'I,,,L,,,,,', 1),
(289, 'XII.4', 'Sơn', ',,,,,,,,R', 1),
(290, 'XIII.1', 'Các bu lông lắp ghép, mối hàn', 'I,,,,,,,,', 1),
(291, 'XIII.2', 'Động cơ điện', ',,,,,,,,', 1),
(292, 'XIII.2.1', 'Rô to', ',,,,,,,I,', 2),
(293, 'XIII.2.2', 'Satato', ',,,,,,,I,', 2),
(294, 'XIII.2.3', 'Vòng bi', 'I,L,,,,,,R,', 2),
(295, 'XIII.2.4', 'Kiểm tra cường độ dòng điện khi máy đang hoạt động', 'I,,,,,,,,', 2),
(296, 'XIII.3', 'Phốt bơm nước', 'I,,,,,,,R,', 1),
(297, 'XIII.4', 'Đường ống nước', 'I,,,,,,,,', 1),
(298, 'XIII.5', 'Mở bôi trơn', ',,,,R,,,R,', 1),
(299, 'XIII.6', 'Hệ thống điện động lực, điều khiển', 'I,,,,I1,,,,', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tableloaithietbi`
--

CREATE TABLE IF NOT EXISTS `tableloaithietbi` (
  `ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `MaSo` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Ten` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ChiTiet` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `tableloaithietbi`
--

INSERT INTO `tableloaithietbi` (`ID`, `MaSo`, `Ten`, `ChiTiet`) VALUES
(1, 'I', 'MÁY QUẬY ACID', ''),
(2, 'II', 'MÁY QUẬY MỦ', ''),
(3, 'III', 'MÁNG PHÂN PHỐI MỦ', ''),
(4, 'IV', 'MÁY KÉO CÁN', ''),
(5, 'IX', 'LÒ SẤY', ''),
(6, 'V', 'BĂNG TẢI BỐ', ''),
(7, 'VI', 'MÁY CÁN 360', ''),
(8, 'VII', 'MÁY CÁN CẮT 360', ''),
(9, 'VIII', 'BƠM CỐM', ''),
(10, 'X', 'SÀN RUNG', ''),
(11, 'XI', 'MÁY ÉP KIỆN 100 TẤN', ''),
(12, 'XII', 'BĂNG TẢI CON LĂN', ''),
(13, 'XIII', 'BƠM NƯỚC LOẠI TRỤC NGANG', '');

-- --------------------------------------------------------

--
-- Table structure for table `tablelogbaotri`
--

CREATE TABLE IF NOT EXISTS `tablelogbaotri` (
  `ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `MaTB` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Ngay` int(15) NOT NULL,
  `MaCongViec` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `NguoiThucHien` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `GhiChu` varchar(1000) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tablemathoigian`
--

CREATE TABLE IF NOT EXISTS `tablemathoigian` (
  `ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `MaSo` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Ten` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `SoNgay` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tablequyenhan`
--

CREATE TABLE IF NOT EXISTS `tablequyenhan` (
  `MaSo` int(10) NOT NULL,
  `MoTa` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`MaSo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tablethaotacbaotri`
--

CREATE TABLE IF NOT EXISTS `tablethaotacbaotri` (
  `ID` varchar(2) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ThaoTac` varchar(75) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tablethaotacbaotri`
--

INSERT INTO `tablethaotacbaotri` (`ID`, `ThaoTac`) VALUES
('I', 'Kiểm tra, làm sạch, hiệu chỉnh hoặc thay thế'),
('I1', 'Kiểm tra, làm sạch, hiệu chỉnh hoặc thay thế có dùng khí nén để vệ sinh'),
('L', 'Bôi trơn'),
('R', 'Thay thế');

-- --------------------------------------------------------

--
-- Table structure for table `tablethietbi`
--

CREATE TABLE IF NOT EXISTS `tablethietbi` (
  `ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `MaTB` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `LoaiTB` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `MaThoiGianBaoTri` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `SoDangKy` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `TrangThai` tinyint(4) NOT NULL DEFAULT '1',
  `NoiDat` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `KieuDang` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `HangSX` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `NuocSX` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `LoSX` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `NamSX` int(15) NOT NULL,
  `ThoiGianBatDauSD` int(15) NOT NULL,
  `VanHanh` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `BaoDuong` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `SuaChua` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Catalog` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `DongCo` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `TruyenDong` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `IsDeleted` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ChiTiet` varchar(1000) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ThoiGianBaoTri` varchar(1000) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `QuaHan` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tablethoigianbaotri`
--

CREATE TABLE IF NOT EXISTS `tablethoigianbaotri` (
  `ID` tinyint(4) NOT NULL,
  `ThoiGian` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tablethoigianbaotri`
--

INSERT INTO `tablethoigianbaotri` (`ID`, `ThoiGian`) VALUES
(1, 86400000),
(2, 180000000),
(3, 1800000000),
(4, 5400000000),
(5, 9000000000),
(6, 18000000000),
(7, 21600000000),
(8, 43200000000),
(9, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tabletrangthai`
--

CREATE TABLE IF NOT EXISTS `tabletrangthai` (
  `ID` tinyint(4) NOT NULL,
  `Ten` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tabletrangthai`
--

INSERT INTO `tabletrangthai` (`ID`, `Ten`) VALUES
(0, 'Không hoạt động'),
(1, 'Hoạt động');

-- --------------------------------------------------------

--
-- Table structure for table `version`
--

CREATE TABLE IF NOT EXISTS `version` (
  `Version` mediumint(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

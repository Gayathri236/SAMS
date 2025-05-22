-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2024 at 11:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sams`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `AttendanceID` int(11) NOT NULL,
  `StudentID` varchar(100) NOT NULL,
  `StudentName` varchar(100) NOT NULL,
  `AttendanceDate` date NOT NULL,
  `AttendanceTime` time NOT NULL,
  `ClassType` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`AttendanceID`, `StudentID`, `StudentName`, `AttendanceDate`, `AttendanceTime`, `ClassType`) VALUES
(1, '200371511937', 'Pramuditha Mayanthi', '2024-10-30', '04:07:00', '2024 Theory'),
(2, '992511893', 'Suranji Madhushan', '2024-10-30', '04:08:00', '2024 Theory');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `ClassID` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`ClassID`, `Name`) VALUES
(1, '2024 Theory'),
(2, '2024 Revision'),
(3, '2024 Paper');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `InvoiceID` int(11) NOT NULL,
  `StudentID` varchar(100) DEFAULT NULL,
  `Student_name` varchar(100) DEFAULT NULL,
  `Class` varchar(100) DEFAULT NULL,
  `Month` varchar(100) DEFAULT NULL,
  `Amount` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`InvoiceID`, `StudentID`, `Student_name`, `Class`, `Month`, `Amount`) VALUES
(1, '200371511937', 'Pramuditha Mayanthi', '2024 Theory', 'November', 1500),
(2, '200371511937', 'Pramuditha Mayanthi', '2024 Revision', 'November', 1500),
(3, '992511893', 'Suranji Madhushan', '2024 Theory', 'November', 1500),
(4, '992511893', 'Suranji Madhushan', '2024 Revision', 'November', 1500);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `ID_Number` varchar(100) NOT NULL,
  `Student_name` varchar(100) DEFAULT NULL,
  `Phone_number` varchar(10) NOT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `School` varchar(100) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `Gender` varchar(6) DEFAULT NULL,
  `Guardian_name` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Class` varchar(100) DEFAULT NULL,
  `Payment_type` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`ID_Number`, `Student_name`, `Phone_number`, `Address`, `School`, `DOB`, `Gender`, `Guardian_name`, `Email`, `Class`, `Payment_type`) VALUES
('200371511937', 'Pramuditha Mayanthi', '0714114003', 'Thonigala,Maradankadawala', 'KCC', '2024-10-01', 'Female', 'Chaminda Prasanna', 'suranjimadhushan@gmail.com', '2024 Theory, 2024 Revision', 'Monthly'),
('992511893', 'Suranji Madhushan', '0714114003', 'Jayasiripura,Siwalakulama', 'Mahanama M.V', '2024-10-09', 'Male', 'Pathma Kumari', 'suranjimadhushan@gmail.com', '2024 Theory, 2024 Revision', 'Monthly');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Telephone` varchar(11) DEFAULT NULL,
  `Username` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `Role` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `Name`, `Telephone`, `Username`, `Password`, `Role`) VALUES
(992511893, 'Suranji Madhushan', '0714114003', 'MadhushanX', '12345', 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`AttendanceID`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`ClassID`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`InvoiceID`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`ID_Number`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `AttendanceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `InvoiceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

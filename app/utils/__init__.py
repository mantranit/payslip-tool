import logging
import random
import string
from datetime import datetime
from slugify import slugify

def get_logger(fileCSV, date_time):
    Log_Format = "%(levelname)s %(asctime)s - %(message)s"

    logging.basicConfig(filename = "{}__{}.log".format(date_time.strftime('%Y%m'), fileCSV),
                        filemode = "a",
                        format = Log_Format, 
                        level = logging.DEBUG)

    return logging.getLogger()

def input_date_time():
    month = input('Nhap thang: ')
    year = input('Nhap nam: ')
    return datetime.strptime('/'.join(('1', month, year)), '%d/%m/%Y')

def get_random_string(n):
    return ''.join(random.choices(string.digits, k = n))

def get_list_words(data):
    return [
        slugify(data['person']['fullName'], lowercase=False, separator='-'),
        data['person']['email'],
        data['currentTime']['date_time'].strftime('%m%Y')
    ]

def currency_format(value):
    value = float(value)
    return "{:,.0f}".format(value)

def get_data(row, password, date_time, logger):
    return {
        'logger': logger,
        'person': {
            'password': password,
            'email': row['Email'],
            'fullName': row['Tên'],
            'workingDays': row['Ngày công thực tế'],
            'leaveDays': row['Ngày phép đã dùng trong tháng'],
            'totalWorkingDays': row['Tổng ngày công'],
            'grossSalary': currency_format(row['Tổng thu nhập']),
            'responsibilityAllowance': currency_format(row['Phụ cấp trách nhiệm']),
            'parkingAllowance': currency_format(row['Phí gửi xe']),
            'bonus': currency_format(row['Bonus']),
            'advance': 0,
            'otherAllowance': 0,
            'overtimePay': currency_format(row['Lương ngoài giờ']),
            'totalSalary': currency_format(row['Lương Chính']),
            'insurance': currency_format(row['Trừ tiền BHXH, BHYT, BHTN (10.5% x 4.729.400đ)']),
            'incomeTax': currency_format(row['Tiền thuế TNCN']),
            'refund': 0,
            'netAmount': currency_format(row['Tổng Thực nhận']),
            'annualLeave': 0,
            'remainingLeave': row['Tổng ngày phép còn lại'],
        },
        'currentTime': {
            'date_time': date_time,
            'monthString': date_time.strftime('%B'),
            'monthYear': date_time.strftime('%B, %Y').upper(),
        }
    }
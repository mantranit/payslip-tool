import math
import random
import string
from slugify import slugify

def get_random_string(n):
    return ''.join(random.choices(string.digits, k = n))

def get_list_words(data):
    return [
        slugify(data['person']['fullName'], lowercase=False, separator='-'),
        data['person']['email'],
        data['currentTime']['date_time'].strftime('%m%Y')
    ]

def get_int(value):
    return int(value) if not math.isnan(value) else 0

def get_float(value):
    return float(value) if not math.isnan(value) else 0.0

def get_data_row(row, password):
    return {
        'password': password,
        'email': row.get('Email', ''),
        'fullName': row.get('Tên', ''),
        'workingDays': get_float(row.get('Ngày công thực tế', 0.0)),
        'leaveDays': get_float(row.get('Ngày phép đã dùng trong tháng', 0.0)),
        'totalWorkingDays': get_float(row.get('Tổng ngày công', 0.0)),
        'grossSalary': get_int(row.get('Tổng thu nhập', 0)),
        'responsibilityAllowance': get_int(row.get('Phụ cấp trách nhiệm', 0)),
        'parkingAllowance': get_int(row.get('Phí gửi xe', 0)),
        'bonus': get_int(row.get('Bonus', 0)),
        'advance': 0,
        'otherAllowance': 0,
        'overtimePay': get_int(row.get('Lương ngoài giờ', 0)),
        'totalSalary': get_int(row.get('Lương Chính', 0)),
        'insurance': get_int(row.get('Trừ tiền BHXH, BHYT, BHTN (10.5% x 4.729.400đ)', 0)),
        'incomeTax': get_int(row.get('Tiền thuế TNCN', 0)),
        'refund': 0,
        'netAmount': get_int(row.get('Tổng Thực nhận', 0)),
        'annualLeave': 0,
        'remainingLeave': get_float(row.get('Tổng ngày phép còn lại', 0.0)),
    }

def prepare_data(date_time, data):
    person = {}
    for key in data.keys():
        if isinstance(data[key], int):
            person[key] = "{:,.0f}".format(data[key])
        else:
            person[key] = data[key]

    return {
        'person': person,
        'currentTime': {
            'date_time': date_time,
            'monthString': date_time.strftime('%B'),
            'monthYear': date_time.strftime('%B, %Y').upper(),
        }
    }

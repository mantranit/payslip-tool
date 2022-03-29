import logging
import random
import string
from datetime import datetime
from slugify import slugify

def get_logger():
    Log_Format = "%(levelname)s %(asctime)s - %(message)s"

    logging.basicConfig(filename = "logfile.log",
                        filemode = "a",
                        format = Log_Format, 
                        level = logging.DEBUG)

    return logging.getLogger()

def input_date_time():
    month = input('Nhap thang:')
    year = input('Nhap nam:')
    return datetime.strptime('/'.join(('1', month, year)), '%d/%m/%Y')

def get_random_string(n):
    return ''.join(random.choices(string.digits, k = n))

def get_list_words(data):
    return [
        slugify(data['person']['fullName'], lowercase=False, separator='-'),
        data['person']['email'],
        data['currentTime']['date_time'].strftime('%m%Y')
    ]

def get_data(row, password, date_time, logger):
    return {
        'logger': logger,
        'person': {
            'email': row[27],
            'password': password,
            'fullName': row[3],
            'workingDays': row[7],
            'leaveDays': row[8],
            'totalWorkingDays': row[9],
            'grossSalary': row[17],
            'responsibilityAllowance': row[10],
            'parkingAllowance': row[16],
            'bonus': row[13],
            'advance': 0,
            'otherAllowance': row[14],
            'overtimePay': row[12],
            'totalSalary': row[18],
            'insurance': row[20],
            'incomeTax': row[22],
            'refund': row[15],
            'netAmount': row[23],
            'annualLeave': 0,
            'remainingLeave': row[26],
        },
        'currentTime': {
            'date_time': date_time,
            'monthString': date_time.strftime('%B'),
            'monthYear': date_time.strftime('%B, %Y').upper(),
        }
    }
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
        'code': row.get('Code', ''),
        'email': row.get('Email', ''),
        'fullName': row.get('Name (*)', ''),
        'workingDays': get_float(row.get('Working days (Include holidays) (1)', 0.0)),
        'leaveDays': get_float(row.get('Leave days (2)', 0.0)),
        'totalWorkingDays': get_float(row.get('Total working days (3) = (1) + (2)', 0.0)),
        'grossSalary': get_int(row.get('Income corresponding to actual working days (4)', 0)),
        'responsibilityAllowance': get_int(row.get('Responsibility allowance (5)', 0)),
        'parkingAllowance': get_int(row.get('Parking allowance (6)', 0)),
        'seniorityBonus': get_int(row.get('Seniority Bonus (7)', 0)),
        'bonus': get_int(row.get('Bonus (8)', 0)),
        'advance': get_int(row.get('Advance (9)', 0)),
        'otherAllowance': get_int(row.get('Other (10)', 0)),
        'overtimePay': get_int(row.get('Overtime pay (11)', 0)),
        'totalSalary': get_int(row.get('Total salary (12) = (4)+(5)+(6)+(7)+(8)+(9)+(10)+(11)', 0)),
        'insurance': get_int(row.get('Insurance: Social, health, unemployment (10.5%) (13)', 0)),
        'incomeTax': get_int(row.get('Personal Income Tax (14)', 0)),
        'deduct': get_int(row.get('Deduct (15)', 0)),
        'netAmount': get_int(row.get('Net Amount (16) = (12) - (13) - (14) - (15)', 0)),
        'annualLeave': get_float(row.get('Leave day', 0.0)),
        'remainingLeave': get_float(row.get('Leave day (Remaining)', 0.0)),
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

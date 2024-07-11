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
        'standardWorkingDays': get_float(row.get('Standard Working day', 0.0)),
        'holidays': get_float(row.get('Holidays', 0.0)),
        'unpaidLeave': get_float(row.get('Unpaid leave', 0.0)),
        'leaveDays': get_float(row.get('Leave days', 0.0)),
        'actualWorkingDay': get_float(row.get('Actual Working day', 0.0)),
        'remainingLeaveDays': get_float(row.get('Remaining leave days', 0.0)),
        'totalWorkingDays': get_float(row.get('Total working days', 0.0)),
        'basicSalary': get_int(row.get('Basic Salary', 0)),
        'responsibilityAllowance': get_int(row.get('Responsibility allowance', 0)),
        'petrolAllowace': get_int(row.get('Petrol Allowace', 0)),
        'phoneAllowance': get_int(row.get('Phone Allowance', 0)),
        'lunchAllowance': get_int(row.get('Lunch Allowance', 0)),
        'seniorityBonus': get_int(row.get('Seniority Bonus', 0)),
        'performanceBonus': get_int(row.get('Performance Bonus', 0)),
        'overtimeIncome': get_int(row.get('Overtime Income', 0)),
        'otherBonus': get_int(row.get('Other Bonus', 0)),
        'otherIncome': get_int(row.get('Other Income', 0)),
        'totalIncome': get_int(row.get('Total Income', 0)),
        'socialInsurance': get_int(row.get('Social Insurance', 0)),
        'personalIncomeTax': get_int(row.get('Personal Income Tax', 0)),
        'othersDeduction': get_int(row.get('Others Deduction', 0)),
        'totalDeduction': get_int(row.get('Total Deduction', 0)),
        'netAmount': get_int(row.get('Net Amount', 0)),
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

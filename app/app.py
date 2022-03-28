import csv
import random
import string
from datetime import datetime
from slugify import slugify

import send_mail
import pdf_processor

def get_filename(data, suffix = ''):
    return '_'.join((
        slugify(data['person']['fullName'], lowercase=False, separator='-'), 
        data['person']['email'], 
        datetime.today().strftime('%m%Y'),
        suffix
    )) + '.pdf'

def get_random_string(n):
    return ''.join(random.choices(string.digits, k = n))

def build_payslip():
    with open("Bang_Luong_Mau.csv", "r") as f:
        reader = csv.reader(f, delimiter="\t")
        for i, line in enumerate(reader):
            row = line[0].split(';')
            if i > 1:
                continue
            if not row[1].isnumeric():
                continue
            
            password = get_random_string(4)

            input_data = {
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
                    'monthString': datetime.today().strftime('%B'),
                    'monthYear': datetime.today().strftime('%B, %Y').upper(),
                }
            }

            path = '/'.join(('payslips', datetime.today().strftime('%Y/%m')))
            filenameTmp = get_filename(input_data, 'temp')
            filename = get_filename(input_data, 'payslip')
            
            pdf_processor.generate(path, filenameTmp, input_data)
            pdf_processor.set_password(path, filenameTmp, filename, password)

            send_mail.send_mail(path, filename, input_data)

if __name__ == "__main__":
    build_payslip();
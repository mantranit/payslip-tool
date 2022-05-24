import pathlib
import sys
import os

import utils
from utils import pdf_processor
from fetch import exec_query
from datetime import datetime

def build_payslip(sql):
    results = exec_query(sql, True)
    date_time = datetime.strptime('/'.join(('1', '2', '2022')), '%d/%m/%Y')
    input_data = {
        'person': results,
        'currentTime': {
            'date_time': date_time,
            'monthString': date_time.strftime('%B'),
            'monthYear': date_time.strftime('%B, %Y').upper(),
        }
    }
    path = '/'.join((os.getcwd(), 'payslips', date_time.strftime('%Y/%m')))
    list_name = utils.get_list_words(input_data)
    filename = '__'.join(list_name) + '.pdf'
    
    print(pdf_processor.generate(path, filename, input_data))

if __name__ == "__main__":
    build_payslip(sys.argv[1]);
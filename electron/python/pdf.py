import sys
import os

import utils
from utils import pdf_processor
from utils.db import exec_query, exec_select
from datetime import datetime

def build_payslip(month, id):
    date_time = datetime.strptime('/'.join(('1', month)), '%d/%m/%Y')
    table = month.replace('/', '_')
    sql = 'SELECT * FROM "{table}" WHERE id = {id}'.format(table=table, id=id)
    results = exec_select(sql, True)
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

    pdfFile = pdf_processor.generate(path, filename, input_data)
    sql = 'UPDATE "{table}" SET pdfFile = "{pdfFile}" WHERE  id = {id}'.format(table=table, pdfFile=pdfFile, id=id)
    exec_query(sql)
    
    print(pdfFile)

if __name__ == "__main__":
    build_payslip(sys.argv[1], sys.argv[2]);
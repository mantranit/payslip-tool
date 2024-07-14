import sys
import utils
from utils import pdf_processor, prepare_data
from utils.db import exec_query, exec_select
from datetime import datetime

def build_payslip(userDataDir, month, id):
    date_time = datetime.strptime('/'.join(('1', month)), '%d/%m/%Y')
    table = month.replace('/', '_')
    sql = 'SELECT * FROM "{table}" WHERE id = {id}'.format(table=table, id=id)
    results = exec_select(userDataDir, sql, True)

    input_data = prepare_data(date_time, results)
    
    path = '/'.join((userDataDir, 'payslips', date_time.strftime('%Y/%m')))
    list_name = utils.get_list_words(input_data)
    filename = '__'.join(list_name) + '.pdf'

    pdfFile = pdf_processor.generate(path, filename, input_data)
    sql = 'UPDATE "{table}" SET pdfFile = "{pdfFile}" WHERE  id = {id}'.format(table=table, pdfFile=pdfFile, id=id)
    exec_query(userDataDir, sql)
    
    print(pdfFile)

if __name__ == "__main__":
    build_payslip(sys.argv[1], sys.argv[2], sys.argv[3]);
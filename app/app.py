from asyncio.log import logger
from cmath import nan
import pandas as pd
from slugify import slugify
from os.path import exists

import utils
from utils import send_mail
from utils import pdf_processor

def build_payslip():
    date_time = utils.input_date_time()
    fileXL = input('Nhap ten file: ')
    fileXL = fileXL if fileXL else 'Bang_Luong_Mau'
    logger = utils.get_logger(fileXL, date_time)
    read_file = pd.read_excel (fileXL + '.xlsx')
    df = read_file.reset_index()
    for index, row in df.iterrows():
        if index > 1:
            continue
        if row['STT'] is nan:
            continue
        password = utils.get_random_string(4)
        input_data = utils.get_data(row, password, date_time, logger)

        path = '/'.join(('payslips', date_time.strftime('%Y/%m')))
        list_name = utils.get_list_words(input_data)
        filename = '__'.join(list_name) + '.pdf'
        list_name.append('encript')
        filenameEncript = '__'.join(list_name) + '.pdf'
        
        if (not exists('/'.join((path, filename)))):
            pdf_processor.generate(path, filename, input_data)

        pdf_processor.set_password(path, filename, filenameEncript, input_data)
        send_mail.send_mail(path, filenameEncript, input_data)
        
if __name__ == "__main__":
    build_payslip();
from asyncio.log import logger
import csv
from datetime import datetime
from slugify import slugify

import utils
from utils import send_mail
from utils import pdf_processor

logger = utils.get_logger()

def build_payslip():
    date_time = utils.input_date_time()
    with open("Bang_Luong_Mau.csv", "r") as f:
        reader = csv.reader(f, delimiter="\t")
        for i, line in enumerate(reader):
            row = line[0].split(';')
            if i > 1:
                continue
            if not row[1].isnumeric():
                continue
            
            password = utils.get_random_string(4)
            input_data = utils.get_data(row, password, date_time, logger)

            path = '/'.join(('payslips', date_time.strftime('%Y/%m')))
            list_name = utils.get_list_words(input_data)
            filename = '__'.join(list_name) + '.pdf'
            list_name.append('encript')
            filenameEncript = '__'.join(list_name) + '.pdf'
            
            pdf_processor.generate(path, filename, input_data)
            pdf_processor.set_password(path, filename, filenameEncript, input_data)

            send_mail.send_mail(path, filenameEncript, input_data)

if __name__ == "__main__":
    build_payslip();
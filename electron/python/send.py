import json
import smtplib
import sys
import os
from os.path import exists
import time

import utils
from utils import send_mail, pdf_processor, prepare_data
from utils.db import exec_query, exec_select
from datetime import datetime

def prepare_mail(userDataDir, sender_email, data, table, date_time):
    input_data = prepare_data(date_time, data)
    
    path = '/'.join((userDataDir, 'payslips', date_time.strftime('%Y/%m')))
    list_name = utils.get_list_words(input_data)
    filename = '__'.join(list_name) + '.pdf'

    list_name.append('encript')
    filenameEncript = '__'.join(list_name) + '.pdf'

    pdfFile = pdf_processor.generate(path, filename, input_data)
    sql = 'UPDATE "{table}" SET pdfFile = "{pdfFile}" WHERE  id = {id}'.format(table=table, pdfFile=pdfFile, id=data['id'])
    exec_query(userDataDir, sql)

    pdf_processor.set_password(path, filename, filenameEncript, input_data)

    return send_mail.build_email_template(path, filenameEncript, input_data, sender_email)

def send_payslip(userDataDir, month, id = 'null'):
    date_time = datetime.strptime('/'.join(('1', month)), '%d/%m/%Y')
    table = month.replace('/', '_')
    server_host = exec_select(userDataDir, '''SELECT * FROM setting WHERE key = "MAIL_SERVER_HOST"''', True)['value']
    server_port = exec_select(userDataDir, '''SELECT * FROM setting WHERE key = "MAIL_SERVER_PORT"''', True)['value']
    sender_email = exec_select(userDataDir, '''SELECT * FROM setting WHERE key = "MAIL_SERVER_ACCOUNT"''', True)['value']
    password = exec_select(userDataDir, '''SELECT * FROM setting WHERE key = "MAIL_SERVER_PASSWORD"''', True)['value']

    # Log in to server using secure context and send email
    # context = ssl.create_default_context()
    with smtplib.SMTP(server_host, int(server_port)) as server:
        server.connect(server_host, int(server_port))
        server.login(sender_email, password)

        results = []
        if (id != 'null'):
            sql = 'SELECT * FROM "{table}" WHERE id = {id}'.format(table=table, id=id)
            results = exec_select(userDataDir, sql)
        else:
            sql = 'SELECT * FROM "{table}"'.format(table=table)
            results = exec_select(userDataDir, sql)

        for item in results:
            [message, encriptedFile] = prepare_mail(userDataDir, sender_email, item, table, date_time)
            sent = server.sendmail(sender_email, item['email'], message.as_string())
            os.remove(encriptedFile)

            if hasattr(sent, 'error'):
                sql = 'UPDATE "{table}" SET isSent = -1 WHERE  id = {id}'.format(table=table, id=item['id'])
                exec_query(userDataDir, sql)
            else:
                sentDate = datetime.now()
                sql = 'UPDATE "{table}" SET isSent = 1, sentDate = "{sentDate}" WHERE  id = {id}'.format(table=table, sentDate=sentDate, id=item['id'])
                exec_query(userDataDir, sql)
                if (id == 'null'):
                    print(json.dumps(item))

            # delay 1s to avoid timeout
            time.sleep(1)

        server.quit()

if __name__ == "__main__":
    send_payslip(sys.argv[1], sys.argv[2], sys.argv[3]);
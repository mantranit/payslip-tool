import os
import pathlib
import pdfkit
import utils
from jinja2 import Template
# from jinja2.filters import FILTERS, pass_environment
from PyPDF2 import PdfFileReader, PdfFileWriter

def get_template_pdf():
    with open(os.getcwd() + "/python/templates/payslip.html", 'r', encoding='UTF-8') as file:
        return file.read()

def generate(path, filename, data):
    inputFile = '/'.join((path, filename))
    pathFile = pathlib.Path(inputFile)
    pathFile.parent.mkdir(parents=True, exist_ok=True)

    # FILTERS["currency_format"] = currency_format
    jinja2_template = Template(get_template_pdf())
    rendered = jinja2_template.render(**data)

    pdf = pdfkit.from_string(rendered, pathFile)
    if pdf:
        return inputFile
    else:
        return ''

def set_password(path, filename, filenameTmp, data):
    inputFile = '/'.join((path, filename))
    outputFile = '/'.join((path, filenameTmp))
    with open(inputFile, "rb") as in_file:
        input_pdf = PdfFileReader(in_file)

        output_pdf = PdfFileWriter()
        output_pdf.appendPagesFromReader(input_pdf)
        output_pdf.encrypt(data['person']['password'])

        with open(outputFile, "wb") as out_file:
            output_pdf.write(out_file)
            data['logger'].info('Encript file {} successfully.'.format(inputFile))

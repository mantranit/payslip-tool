import os
import pathlib
import pdfkit
from jinja2 import Template
from jinja2.filters import FILTERS, pass_environment
from PyPDF2 import PdfFileReader, PdfFileWriter

def get_template_pdf():
    with open("templates/payslip.html", 'r', encoding='UTF-8') as file:
        return file.read()

@pass_environment
def currency_format(environment, value, attribute=None):
    value = float(value)
    return "{:,.0f}".format(value)

def generate(path, filename, data):
    pathFile = pathlib.Path('/'.join((path, filename)))
    pathFile.parent.mkdir(parents=True, exist_ok=True)

    FILTERS["currency_format"] = currency_format
    jinja2_template = Template(get_template_pdf())
    rendered = jinja2_template.render(**data)

    pdf = pdfkit.from_string(rendered, pathFile)
    print(pdf)

def set_password(path, filenameTmp, filename, password):
    inputFile = '/'.join((path, filenameTmp))
    outputFile = '/'.join((path, filename))
    with open(inputFile, "rb") as in_file:
        input_pdf = PdfFileReader(in_file)

        output_pdf = PdfFileWriter()
        output_pdf.appendPagesFromReader(input_pdf)
        output_pdf.encrypt(password)

        with open(outputFile, "wb") as out_file:
            output_pdf.write(out_file)
            os.remove(inputFile)

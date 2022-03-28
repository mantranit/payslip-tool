from openpyxl import load_workbook

wb = load_workbook('Mau.xlsx')
sheet = wb.active
print(sheet)
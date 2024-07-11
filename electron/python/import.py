import sys
import math
import pandas as pd
from utils.db import connect_db

import utils

def import_payslip(userDataDir, month, path):
    table = month.replace('/', '_')
    con, cur = connect_db(userDataDir)

    # Truncate table
    cur.execute('''DROP TABLE IF EXISTS "{table}"'''.format(table=table))
    # Create table
    cur.execute('''CREATE TABLE IF NOT EXISTS "{table}" (
                id INTEGER NOT NULL UNIQUE,
                password TEXT,
                code TEXT, 
                email TEXT, 
                fullName TEXT, 
                standardWorkingDays REAL,
                holidays REAL,
                unpaidLeave REAL,
                leaveDays REAL,
                actualWorkingDay REAL,
                remainingLeaveDays REAL,
                totalWorkingDays REAL,
                basicSalary INTEGER,
                responsibilityAllowance INTEGER,
                petrolAllowace INTEGER,
                phoneAllowance INTEGER,
                lunchAllowance INTEGER,
                seniorityBonus INTEGER,
                performanceBonus INTEGER,
                overtimeIncome INTEGER,
                otherBonus INTEGER,
                otherIncome INTEGER,
                totalIncome INTEGER,
                socialInsurance INTEGER,
                personalIncomeTax INTEGER,
                othersDeduction INTEGER,
                totalDeduction INTEGER,
                netAmount INTEGER,
                pdfFile TEXT, 
                isSent INTEGER, 
                sentDate TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
    )'''.format(table=table))

    xl_excel = pd.ExcelFile(path)
    for sheet_name in xl_excel.sheet_names:
        read_file = pd.read_excel(path, [sheet_name])
        df = read_file[sheet_name]
        for index, row in df.iterrows():
            print(row)
            if not isinstance(row.get('Email'), str):
                continue
            password = utils.get_random_string(4)
            input_data = utils.get_data_row(row, password)
            row_value = list(input_data.values())
            cur.execute('''INSERT INTO "{table}" VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '', 0, '')'''.format(table=table), row_value)
    
    # Save (commit) the changes
    con.commit()
    # We can also close the connection if we are done with it.
    # Just be sure any changes have been committed or they will be lost.
    con.close()

    print('{"data": true}')

if __name__ == '__main__':
    import_payslip(sys.argv[1], sys.argv[2], sys.argv[3])

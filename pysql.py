import mysql.connector

mydb = mysql.connector.connect(
  host="sql10.freemysqlhosting.net",
  user="sql10620591",
  password="RMYARyIbe6",
  database="sql10620591"
)

def insertValue(table, key, value):
    mycursor = mydb.cursor()
    sqlPart1 = f"INSERT INTO {table} ("
    sqlPart2 = ") VALUES ("

    for x in range(0,len(key)):
        sqlPart1 += key[x] if x != 0 else (key[x]+", ")
    for x in range(0,len(value)):
        sqlPart2 += value[x] if x != 0 else (value[x]+", ")
    
    sql = sqlPart1 + sqlPart2 + ")"
    # print(sql)
    try:
        mycursor.execute(sql)
        mydb.commit()
        insertedId = mycursor.lastrowid
        mycursor.close()
        return str(insertedId)

    except Exception as e:
        print(e)
        mycursor.close()
        if str(e).find("Duplicate") > -1:
            return f"Username {value[0]} já existente"
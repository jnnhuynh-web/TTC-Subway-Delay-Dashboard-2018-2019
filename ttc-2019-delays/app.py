# import necessary libraries
import os
from flask import (Flask, render_template, jsonify, request, redirect)
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
from flask_sqlalchemy import SQLAlchemy
engine = create_engine('postgres://root:root1234@my-postgres-db.cxwwjsronhkv.ca-central-1.rds.amazonaws.com:5432/postgres')
Base = automap_base()
Base.prepare(engine, reflect=True)
ttc_subway_delay = Base.classes.ttc_subway_detail
station_in_line = Base.classes.stations_in_line

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")
    
# create route to query database and send jsonified results for delay data    
@app.route("/delay")
def delay():
    session=Session(engine)

    sel=[ttc_subway_delay.date, 
    ttc_subway_delay.time, 
    ttc_subway_delay.day, 
    ttc_subway_delay.station,
    ttc_subway_delay.code,
    ttc_subway_delay.min_delay,
    ttc_subway_delay.min_gap,
    ttc_subway_delay.bound,
    ttc_subway_delay.line,
    ttc_subway_delay.vehicle,
    ttc_subway_delay.code_info,
    ttc_subway_delay.latitude,
    ttc_subway_delay.longitude,
    ttc_subway_delay.line_name,
    ttc_subway_delay.month,
    ttc_subway_delay.time_range,
    ttc_subway_delay.month_number,
    ttc_subway_delay.hour,
    ttc_subway_delay.year]

    results = session.query(*sel).all()

    ttc_subway_delay_data = []

    for result in results:
        ttc_subway_delay_data.append(
            {"date": result[0],
            "time": result[1],
            "day": result[2],
            "station": result[3],
            "code": result[4],
            "min_delay": result[5],
            "min_gap": result[6],
            "bound": result[7],
            "line": result[8],
            "vehicle": result[9],
            "code_info": result[10],
            "latitude": result[11],
            "longitude": result[12],
            "line_name": result[13],
            "month": result[14],
            "time_range": result[15],
            "month_number": result[16],
            "hour": result[17],
            "year": result[18]}
        )
    session.close()
    return jsonify(ttc_subway_delay_data)

# # create route to query database and send jsonified results for map data
@app.route("/map")
def map():
    session=Session(engine)

    sel=[station_in_line.station,
        station_in_line.latitude,
        station_in_line.longitude,
        station_in_line.line_name,
        station_in_line.avg_delay_time_2019,
        station_in_line.num_delays_2019,
        station_in_line.avg_delay_time_2018,
        station_in_line.num_delays_2018]

    results = session.query(*sel).all()

    station_in_line_data = []

    for result in results:
        station_in_line_data.append(
            {"station": result[0],
            "latitude": result[1],
            "longitude": result[2],
            "line_name": result[3],
            "avg_delay_time_2019": result[4],
            "num_delays_2019": result[5],
            "avg_delay_time_2018": result[6],
            "num_delays_2018": result[7]
            }
        )
    session.close()
    return jsonify(station_in_line_data)

if __name__ == "__main__":
    app.run()

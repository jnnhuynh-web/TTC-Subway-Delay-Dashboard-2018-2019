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

engine_heroku = create_engine('postgres://omtjgoefxknxjr:4dc783a299806ee57d98e35b67ccfbfc26f71b0f7ef0806de7a83021d71b69a8@ec2-184-72-236-57.compute-1.amazonaws.com:5432/d397mvjlukaah3')
Base = automap_base()
Base.prepare(engine_heroku, reflect=True)
ttc_subway_2019 = Base.classes.ttc_subway_2019
station_in_line = Base.classes.station_in_line
# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")
    
# create route to query database and send jsonified results for delay data    
@app.route("/delay")
def delay():
    session=Session(engine_heroku)

    sel=[ttc_subway_2019.date, 
    ttc_subway_2019.time, 
    ttc_subway_2019.day, 
    ttc_subway_2019.station,
    ttc_subway_2019.code,
    ttc_subway_2019.min_delay,
    ttc_subway_2019.min_gap,
    ttc_subway_2019.bound,
    ttc_subway_2019.line,
    ttc_subway_2019.vehicle,
    ttc_subway_2019.code_info,
    ttc_subway_2019.latitude,
    ttc_subway_2019.longitude,
    ttc_subway_2019.line_name,
    ttc_subway_2019.month,
    ttc_subway_2019.time_range]

    results = session.query(*sel).all()

    ttc_subway_2019_data = []

    for result in results:
        ttc_subway_2019_data.append(
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
            "time_range": result[15]}
        )
    session.close()
    return jsonify(ttc_subway_2019_data)

# # create route to query database and send jsonified results for map data
@app.route("/map")
def map():
    session=Session(engine_heroku)

    sel=[station_in_line.station,
        station_in_line.latitude,
        station_in_line.longitude,
        station_in_line.line_name,
        station_in_line.num_delays,
        station_in_line.avg_delay_time]

    results = session.query(*sel).all()

    station_in_line_data = []

    for result in results:
        station_in_line_data.append(
            {"station": result[0],
            "latitude": result[1],
            "longitude": result[2],
            "line_name": result[3],
            "num_delays": result[4],
            "avg_delay_time": result[5]
            }
        )
    session.close()
    return jsonify(station_in_line_data)

if __name__ == "__main__":
    app.run()

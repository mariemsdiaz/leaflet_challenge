# Earthquake and Tectonic Plates Interactive Map

## Overview
This is project that creates an interactive map that displays real-time earthquake data (magnitude 2.5+ from the past 30 days) alongside tectonic plate boundaries using the JavaScript library Leaflet. The map allows users to view, switch, and interact with both datasets on a global scale. It also includes multiple base map options and a control panel to toggle between the different layers.

![Eartquake Layer](https://github.com/mariemsdiaz/leaflet_challenge/blob/main/Leaflet-Part-1/Images/Eartquake.png)

![Techtonic Layer](https://github.com/mariemsdiaz/leaflet_challenge/blob/main/Leaflet-Part-1/Images/techtonic_plates.png)


## Features
- Earthquake Data Layer: Displays earthquake markers with size corresponding to magnitude and color representing depth. Popups show detailed earthquake information, such as magnitude, location, and depth.
- Tectonic Plates Layer: Outlines tectonic plate boundaries in purple with adjustable line thickness and transparency.
- Layer Controls: Allows users to toggle between the earthquake data and tectonic plates layers independently.
- Base Map Options: Includes multiple base map styles (Street Map, Satellite Map, and Dark Map) for enhanced user experience.
- Legend: A dynamic color legend indicating earthquake depth ranges is displayed in the bottom right corner.

![Base Layers](https://github.com/mariemsdiaz/leaflet_challenge/blob/main/Leaflet-Part-1/Images/base_maps.png)

## Data Sources

Earthquake Data: Fetched from the USGS Earthquake Feed API. The dataset contains global earthquakes of magnitude 2.5+ over the last 30 days.
Tectonic Plate Boundaries: A local GeoJSON file (PB2002_plates.json) contains the tectonic plate boundary data.

## Notes

This project was created using past class activities focussing on Leafleat, and the use of chatGTP to quick generate code and updates. 
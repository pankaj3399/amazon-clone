import React from 'react';
import './Home.css';
import Product from './Product';

function Home() {
	return (
		<div className="home">
			<div className="home__container">
				<img
					className="home__image"
					src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
					alt=""
				/>
				<div className="home__row">
					<Product
						id="1"
						title="Joy of Cooking: 2019 Edition Fully Revised and Updated Kindle Edition"
						price={631}
						image="https://m.media-amazon.com/images/I/71E38BP7AlL._AC_UY327_FMwebp_QL65_.jpg"
						rating={5}
					/>
					<Product
						id="2"
						title="Mastering the Art of French Cooking, Vol.1"
						price={500}
						image="https://m.media-amazon.com/images/I/81Wn+wxILnL._AC_UY327_FMwebp_QL65_.jpg"
						rating={5}
					/>
				</div>
				<div className="home__row">
					<Product
						id="3"
						title="Pastry School: 101 Step-By-Step Recipes"
						price={300}
						image="https://m.media-amazon.com/images/I/71oHHZTJg3L._AC_UL480_FMwebp_QL65_.jpg"
						rating={5}
					/>
					<Product
						id="4"
						title="One Tin Bakes: Sweet and simple traybakes, pies, bars and buns"
						price={200}
						image="https://m.media-amazon.com/images/I/81wMHfeAG3L._AC_UL480_QL65_.jpg"
						rating={5}
					/>
					<Product
						id="5"
						title="French Patisserie: Master Recipes and Techniques from the Ferrandi School of Culinary Arts Hardcover – 14 November 2017"
						price={250}
						image="https://images-na.ssl-images-amazon.com/images/I/51f4OkLI3ML._SX425_BO1,204,203,200_.jpg"
						rating={5}
					/>
				</div>
				<div className="home__row">
					<Product
						id="6"
						title="Patisserie: Mastering the Fundamentals of French Pastry Hardcover – 26 February 2013"
						price={150}
						image="https://images-na.ssl-images-amazon.com/images/I/41ciaHQRNKL._SX354_BO1,204,203,200_.jpg"
						rating={5}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;

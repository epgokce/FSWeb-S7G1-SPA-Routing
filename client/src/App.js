import React, { useState, useEffect } from "react";
import axios from "axios";
import Film from "./Filmler/Film";
import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import FilmListesi from "./Filmler/FilmListesi";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([
    
  ]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          // Bu kısmı log statementlarıyla çalışın
          console.log(response);
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    console.log("id", id, typeof id);

    const varMi = saved.find((film) => film.id === Number(id));

    console.log("varMi", varMi);

    if (!varMi) {
      const kaydedilecekFilm = movieList.find((film) => film.id === Number(id));
      console.log("kaydedilecekFilm", kaydedilecekFilm);
      const yeniSavedState = [kaydedilecekFilm, ...saved];
      setSaved(yeniSavedState);
    }
  };

  return (
    <div>
      <KaydedilenlerListesi list={saved} />
      <Switch>
        <Route path="/filmler/:id">
          <Film KaydedilenlerListesineEkle={KaydedilenlerListesineEkle} />
        </Route>
        <Route path="/">
          <FilmListesi movies={movieList} />
        </Route>
      </Switch>
    </div>
  );
}

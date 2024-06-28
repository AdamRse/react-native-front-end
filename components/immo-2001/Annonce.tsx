import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Annonce {
    _id: string;
    titre: string;
}

const Annonces = () => {
    const [annonces, setAnnonces] = useState<Annonce[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://192.168.1.19:3000/annonces")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setAnnonces(data))
            .catch((error) => setError(error.message));
    }, []);

    return (
        <View style={styles.container}>
            {error ? (
                <Text style={styles.errorText}>Error: {error}</Text>
            ) : (
                annonces.map((annonce) => (
                    <Text style={styles.txt} key={annonce._id}>{annonce._id} {annonce.titre} : {annonce.description}</Text>
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  txt: {
    color: 'green'
    , textAlign: 'center',
    marginTop: 50
  }
});

export default Annonces;
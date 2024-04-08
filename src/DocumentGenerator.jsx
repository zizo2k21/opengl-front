import React, { useState } from "react";
import axios from "axios";
import "./DocumentGenerator.css"; // Importez votre fichier CSS

function DocumentGenerator() {
    const [fullName, setFullName] = useState("");
    const [emploi, setEmploi] = useState("");
    const [matricule, setMatricule] = useState("");
    const [service , setService] = useState("");
    const [fonction, setFonction] = useState("");
    const [date, setDate] = useState("");
    const [downloadUrl, setDownloadUrl] = useState("");

    const generateDocument = async () => {
        try {
            // Envoi de la requête POST vers le serveur local
            const response = await axios.post("https://opengl-back.onrender.com/generer-document", {
                full_name: fullName,
                emploi: emploi,
                matricule: matricule,
                service: service,
                fonction: fonction,
                date: date
            }, {
                responseType: 'arraybuffer' // Spécifiez le type de réponse comme 'arraybuffer'
            });
            // Traitement de la réponse
            const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
            const url = window.URL.createObjectURL(blob);
            // Mise à jour de l'URL de téléchargement
            setDownloadUrl(url);
        } catch (error) {
            // Gestion des erreurs
            console.error("Erreur lors de la génération du document :", error);
        }
    };

    return (
        <div className="form-container">
            {!downloadUrl && <> 
            <h2>Générateur de document Prototype-attestation de travail DESPS</h2>
            <div className="form-group">
                <label className="form-label">Nom complet :</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
                <label className="form-label">Emploi :</label>
                <input type="text" value={emploi} onChange={(e) => setEmploi(e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
                <label className="form-label">Matricule :</label>
                <input type="text" value={matricule} onChange={(e) => setMatricule(e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
                <label className="form-label">Service :</label>
                <input type="text" value={service} onChange={(e) => setService(e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
                <label className="form-label">Fonction :</label>
                <input type="text" value={fonction} onChange={(e) => setFonction(e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
                <label className="form-label">Date de prise de fonction :</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-input" />
            </div>
            <button onClick={generateDocument} className="form-button">Générer Document</button>
            </>}
            {/* Lien de téléchargement */}
            {downloadUrl && (
                <div className="download-link">
                    <p>Le documeny est prêt a être téléchargé. </p>
                    <p>Cliquez sur le boutton ci-dessous pour le telecharger. </p>
                    <a href={downloadUrl} download={`attestation_travail_${fullName}.docx`}>Télécharger le document</a>
                </div>
            )}
        </div>
    );
}

export default DocumentGenerator;

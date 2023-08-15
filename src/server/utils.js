import axios from 'axios';

export const getAuthToken = (body) => {
    return new Promise((resolve, reject) => {
      try {
        const { Username,
        Password,
        Sistema,
        UsuarioId, ServicioId, CodigoDeCliente } = body;
        
        const authBody = {
            "Username": Username,
            "Password": Password,
            "Sistema": Sistema,
            "Usuario id": UsuarioId,
            "Servicio id": ServicioId,
            "Código de cliente": CodigoDeCliente,
        };
        
        axios
          .post(
            "https://servicios.correos.go.cr:442/Token/authenticate",
            authBody,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                "Accept-Encoding": "gzip, deflate, br",
              },
            }
          )
          .then((resp) => {
            resolve(resp.data);
          })
          .catch((error) => {
            resolve(error.response.data);
          });
      } catch (err) {
        throw new Error(err);
        reject(err);
      }
    })
  };
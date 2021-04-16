import { useState, useContext } from 'react';
import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';

import { AuthContext } from '../../context/auth';

import { FiSettings, FiUpload } from 'react-icons/fi';

export default function Profile(){
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);

  const [name, setName] = useState( user && user.nome );
  const [email, setEmail] = useState( user && user.email );
  
  const [avatarUrl, setAvatarUrl] = useState( user && user.avatarUrl );
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e){
    console.log(e.target.files[0]);

    if(e.target.files[0]) {
      const image = e.target.files[0];

      if(image.type === "image/jpeg" || image.type === "image/png"){
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(image))
      } else {
        alert("Envie uma imagem do tipo PNG ou JPG");
        setImageAvatar(null);
        return null;
      }
    }
    
  }

  async function handleUpload() {
    const currentUid = user.uid;

    const uploadTask = await firebase.storage()
      .ref(`images/${currentUid}/${imageAvatar.name}`)
      .put(imageAvatar)
      .then( async ()=> {
        toast.success(name + ', your image was updated!');

        await firebase.storage()
          .ref(`images/${currentUid}`)
          .child(imageAvatar.name).getDownloadURL()
          .then(async (url) => {
            let urlPhoto = url;

            await firebase.firestore().collection('users')
              .doc(user.uid)
              .update({
                avatarUrl: urlPhoto,
                nome: name
              })
              .then(()=>{
                let data = {
                  ...user,
                  avatarUrl: urlPhoto,
                  nome: name
                };
                setUser(data);
                storageUser(data);
                toast.success(name + ', your changes have been successfully made');
              })
          })
      })
  }

  async function handleSave(e) {
    e.preventDefault();
    
    if(imageAvatar === null && name !== ''){
      await firebase.firestore()
        .collection('users')
        .doc(user.uid)
        .update(
          {nome: name}
        )
        .then(()=>{
          let data = {
            ...user,
            nome: name
          };
          setUser(data);
          storageUser(data);
          toast.success(name + ', your changes have been successfully made');
        });
    } else if(name !== '' && imageAvatar !== null ) {
      handleUpload();
    }
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Meu perfil">
          <FiSettings size={25} />
        </Title>
        
        <div className="container">
          <form className="form-profile" onSubmit={handleSave}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#FFF" size={25}/>
              </span>

              <input type="file" accept="image/*" onChange={handleFile} />
              { avatarUrl === null ?
                <img src={avatar} width="250" height="250" alt="User Profile Photo" />
                :
                <img src={avatarUrl} width="250" height="250" alt="User Profile Photo" />
              }
            </label>

            <label>Nome</label>
            <input type="text" value={name} onChange={ (e) => {setName(e.target.value)}}/>

            <label>email</label>
            <input type="text" value={email} onChange={ (e) => {setName(e.target.value)}} disabled={true}/>

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
              <button className="logout-btn" onClick={()=> signOut()}>
                Sair
              </button>
        </div>

      </div>
    </div>
  )
}
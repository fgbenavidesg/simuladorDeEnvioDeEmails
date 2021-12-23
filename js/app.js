//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');
const expRegular= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;




const eventListener = () => {
    //cuado la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);
    //campos del formulario
    email.addEventListener('blur',validarFormulario);
    asunto.addEventListener('blur',validarFormulario);
    mensaje.addEventListener('blur',validarFormulario); 
    //reiniciar formulario
    btnReset.addEventListener('click', resetearFormulario);

    //enviar formulario 
    formulario.addEventListener('submit', enviarEmail);


    
}

//funciones

 const iniciarApp = () =>{

    btnEnviar.disabled = true;
    btnEnviar.classList.add('opacity-50');
 }

 const validarFormulario = (e) =>{

    if(e.target.value.length > 0){

        //elimina los errores
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500');
        

    }else{
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');
            mostrarError('todos los campos son obligatorios');
    }

    if(e.target.type==='email'){
                                      
        // devulve el indice de la indicacion
       
        if(expRegular.test(e.target.value)){

            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
    
            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500'); 

        }else{
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');
            mostrarError('email no valido');
        }

    }
    if(expRegular.test(email.value) && asunto.value !=='' && mensaje.value !=='' ){

         btnEnviar.disabled = false;
         btnEnviar.classList.remove('opacity-50','cursor-not-allowed');
    }

 }

 const mostrarError = (mensaje) =>{
     const mensajeError = document.createElement('p');
     mensajeError.textContent = mensaje;
     mensajeError.classList.add('error','border', 'border-red-500','backgraund-red-100'
     ,'text-red-500','p-3','mt-5','text-center');
     //seleciona todos los mensajes con la clase error
     const errores = document.querySelectorAll('.error'); 
    if(errores.length===0)
    {
        formulario.appendChild(mensajeError);
    }


                //donde quieres insertarlo
    //formulario.insertBefore(mensajeError,document.querySelector('.m10'));
}

const enviarEmail=(e) =>{
   // e.preventDefault();

    const spinner = document.querySelector('#spinner'); 
    spinner.style.display='flex';

    setTimeout(() => {
        
        spinner.style.display='none';  
        const parrafo = document.createElement('p');
        parrafo.textContent = 'el correo se envio correctamente';
        parrafo.classList.add('text-center','my-10','p-5','bg-green-500','text-white','font-blod','uppercase');
        formulario.insertBefore(parrafo,spinner);

        setTimeout(() => {
            parrafo.remove();

            resetearFormulario();  
        }, 4000);
    }, 3000);


}
// resetear el formulario

const resetearFormulario = () => {
  //  e.preventDefault();
    formulario.reset();
    iniciarApp();
}

eventListener();
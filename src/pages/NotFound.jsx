import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <>
      <style>{`
        .notfound{
            min-height:80vh;
            display:flex;
            justify-content:center;
            align-items:center;
            padding:40px 20px;
        }

        .notfound-card{

            width:100%;
            max-width:650px;

            background:#1E293B;

            border:1px solid #334155;

            border-radius:20px;

            padding:50px 30px;

            text-align:center;

            box-shadow:0 15px 40px rgba(0,0,0,.3);

        }

        .error-icon{

            font-size:70px;

            color:#EF4444;

            margin-bottom:20px;

        }

        .error-code{

            font-size:90px;

            color:white;

            font-weight:700;

            margin-bottom:10px;

        }

        .error-title{

            font-size:30px;

            color:white;

            margin-bottom:15px;

        }

        .error-desc{

            color:#94A3B8;

            line-height:1.8;

            margin-bottom:35px;

        }

        .home-btn{

            display:inline-flex;

            align-items:center;

            gap:10px;

            padding:15px 28px;

            background:#3B82F6;

            color:white;

            border-radius:12px;

            font-weight:600;

            transition:.3s;

        }

        .home-btn:hover{

            background:#2563EB;

            transform:translateY(-3px);

            box-shadow:0 10px 25px rgba(59,130,246,.3);

        }

        @media(max-width:768px){

            .error-code{

                font-size:70px;

            }

            .error-title{

                font-size:24px;

            }

            .error-icon{

                font-size:55px;

            }

        }

        @media(max-width:480px){

            .notfound-card{

                padding:35px 20px;

            }

            .error-code{

                font-size:55px;

            }

            .error-title{

                font-size:20px;

            }

            .home-btn{

                width:100%;

                justify-content:center;

            }

        }
      `}</style>

      <div className="notfound">
        <motion.div
          className="notfound-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <FaExclamationTriangle className="error-icon" />

          <h1 className="error-code">404</h1>

          <h2 className="error-title">
            Oops! Page Not Found
          </h2>

          <p className="error-desc">
            The page you are looking for doesn't exist or has
            been moved. Click the button below to return to
            your Notes Dashboard.
          </p>

          <Link to="/" className="home-btn">
            <FaHome />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </>
  );
}

export default NotFound;
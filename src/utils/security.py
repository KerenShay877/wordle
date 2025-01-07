import bcrypt
import logging

def hash_password(password: str) -> bytes:
    """
    Hash a password using bcrypt.
    
    Args:
        password: Plain text password
    Returns:
        Hashed password as bytes
    """
    try:
        # Generate a salt and hash the password
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed
    except Exception as e:
        logging.error(f"Error hashing password: {e}")
        raise

def verify_password(plain_password: str, hashed_password: bytes) -> bool:
    """
    Verify a password against its hash.
    
    Args:
        plain_password: Password to check
        hashed_password: Stored hash to check against
    Returns:
        True if password matches, False otherwise
    """
    try:
        return bcrypt.checkpw(
            plain_password.encode('utf-8'), 
            hashed_password
        )
    except Exception as e:
        logging.error(f"Error verifying password: {e}")
        return False 